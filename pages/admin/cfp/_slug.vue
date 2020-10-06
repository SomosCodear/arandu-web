ls<template>
  <div v-if="cfp != null" class="cfp-admin-container">
    <h1>
      {{ cfp.title }}
    </h1>
    <p>
      {{ cfp.description }}
    </p>
    <div class="cfp-form">
      <card class="cfp-preview">
        <div
          v-for="field in sortedFields"
          :key="field.id"
          class="cfp-field-wrapper"
          :class="{ active: field.id === editingField.id }"
          @click="startEditing(field)"
        >
          <cfp-field
            :field="editingField.id === field.id ? editingField : field"
          />
        </div>
      </card>
      <card class="cfp-config">
        <cfp-field-editor
          v-if="'id' in editingField"
          :field="editingField"
          @save-changes="saveChanges()"
          @cancel-changes="cancelChanges()"
        />
      </card>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda';
import { useContext } from '@nuxtjs/composition-api';
import { computed, ref } from '@vue/composition-api';
import { useParamToRef } from '~/utils/useParamToRef';
import { useCfpBySlug } from '~/data/cfp';

export default {
  setup() {
    const { app } = useContext();
    const slugRef = useParamToRef('slug');
    const { data: cfp, mutate } = useCfpBySlug(slugRef);
    const sortedFields = computed(() => R.sortBy(R.prop('order'))(cfp.value.fields));
    const editingFieldRef = ref({});

    const startEditing = (field) => {
      let originalField = {};

      if (editingFieldRef.value.id != null) {
        originalField = R.find(
          R.propEq('id', editingFieldRef.value.id),
          sortedFields.value,
        );
      }

      if (
        field.id !== editingFieldRef.value.id
        && R.equals(originalField, editingFieldRef.value)
      ) {
        editingFieldRef.value = R.clone(field);
      }
    };

    const saveChanges = async () => {
      await mutate(async () => {
        const changedField = await app.$axios.$patch(
          `${app.$config.apiUrl}/cfps/${slugRef.value}/field/${editingFieldRef.value.id}`,
          R.omit(['id'], editingFieldRef.value),
        );

        return {
          ...cfp.value,
          fields: [
            ...R.reject(R.propEq('id', changedField.id))(cfp.value.fields),
            R.clone(changedField),
          ],
        };
      });
      editingFieldRef.value = {};
    };

    const cancelChanges = () => {
      editingFieldRef.value = {};
    };

    return {
      cfp,
      sortedFields,
      editingField: editingFieldRef,
      startEditing,
      saveChanges,
      cancelChanges,
    };
  },
};
</script>

<style lang="scss" scoped>
.cfp-admin-container {
  margin: 4rem auto;
  width: 64rem;
  display: flex;
  flex-direction: column;
  text-align: center;

  h1 {
    margin: 0;
  }
}

.cfp-form {
  display: flex;
  flex-direction: row;
  align-self: stretch;
  text-align: left;
}

.cfp-preview {
  width: 70%;
  margin-right: 1rem;
}

.cfp-config {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cfp-field-wrapper {
  padding: 1rem;
  cursor: pointer;

  &.active {
    box-shadow: 0 0 0.125rem 0.0625rem var(--arandu-green);
  }
}
</style>
