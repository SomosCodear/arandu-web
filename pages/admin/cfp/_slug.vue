<template>
  <div v-if="cfp != null" class="cfp-admin-container">
    <h1>
      {{ cfp.title }}
    </h1>
    <p>
      {{ cfp.description }}
    </p>
    <div class="cfp-form">
      <card class="cfp-toolbox">
        <button
          v-for="(name, type) in types"
          :key="type"
          :value="type"
          type="button"
          @click="addField(type)"
        >
          {{ name }}
        </button>
      </card>
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
import { FIELD_NAMES, useCfpBySlug } from '~/data/cfp';

export default {
  setup() {
    const { app } = useContext();
    const slugRef = useParamToRef('slug');
    const { data: cfp, mutate } = useCfpBySlug(slugRef);
    const sortedFields = computed(() => R.sortBy(R.prop('order'))(cfp.value.fields));
    const editingFieldRef = ref({});

    const addField = (type) => {
      mutate(async () => ({
        ...cfp.value,
        fields: [
          ...cfp.value.fields,
          {
            id: 'fake',
            type,
            name: 'nuevo_campo',
            title: 'Nuevo Campo',
            hint: '',
            description: '',
            order: sortedFields.value[sortedFields.value.length - 1].order + 1,
            options: [],
          },
        ],
      }));
    };

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
      types: FIELD_NAMES,
      sortedFields,
      editingField: editingFieldRef,
      addField,
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
  max-width: 80rem;
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

.cfp-toolbox {
  flex: 1;

  // eslint-disable-next-line vue-scoped-css/no-unused-selector
  button + button {
    margin-top: 0.5rem;
  }
}

.cfp-preview {
  width: 60%;
  margin: 0 1rem;
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
