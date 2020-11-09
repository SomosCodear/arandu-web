<template>
  <main v-if="cfp != null" class="cfp-admin-container">
    <h1>
      {{ cfp.title }}
    </h1>
    <p>
      {{ cfp.description }}
    </p>
    <div class="cfp-form">
      <div class="cfp-toolbox">
        <arandu-button
          v-for="(name, type) in types"
          :key="type"
          class="field-add-button"
          type="button"
          @click="addField(type)"
        >
          {{ name }}
        </arandu-button>
      </div>
      <card class="cfp-preview">
        <draggable v-model="sortedFields">
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
        </draggable>
      </card>
      <card
        class="cfp-config"
        :class="{ active: editingField.id != null }"
      >
        <cfp-field-editor
          v-if="'id' in editingField"
          :field="editingField"
          @save-changes="saveChanges()"
          @cancel-changes="cancelChanges()"
          @remove-field="removeField()"
        />
      </card>
    </div>
  </main>
</template>

<script>
import * as R from 'ramda';
import { computed, ref } from '@vue/composition-api';
import { mutate } from 'swrv';
import { useParamToRef } from '~/utils/useParamToRef';
import {
  FIELD_NAMES,
  useCfpBySlug,
  useCreateCfpField,
  useUpdateCfpField,
  useDeleteCfpField,
} from '~/data/cfp';

export default {
  setup() {
    const slugRef = useParamToRef('slug');
    const { key, data: cfp, mutate: revalidate } = useCfpBySlug(slugRef, {
      revalidateOnFocus: false,
    });
    const createField = useCreateCfpField(key);
    const updateField = useUpdateCfpField(key);
    const deleteField = useDeleteCfpField(key);
    const editingFieldRef = ref({});
    const sortedFields = computed({
      get: () => R.sortBy(R.prop('order'))(cfp.value.fields),
      set: async (reorderedFields) => {
        const [newOrder, movedFieldId] = R.compose(
          R.head,
          R.sort(R.descend(R.nth(2))),
          R.addIndex(R.map)((field, index) => [
            index + 1, // new order
            field.id,
            Math.abs(field.order - index - 1), // old order - new order
          ]),
        )(reorderedFields);

        // optimistic update
        mutate(key.value, {
          ...cfp.value,
          fields: R.addIndex(R.map)((field, index) => ({
            ...field,
            order: index + 1,
          }))(reorderedFields),
        });

        // actual update
        try {
          await updateField(movedFieldId, { order: newOrder });

          // make sure the field being edited also has the correct order
          if (editingFieldRef.value.id === movedFieldId) {
            editingFieldRef.value.order = newOrder;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Failed to save reorder', e);
        }

        // revalidate all fields positions
        revalidate();
      },
    });

    const addField = (type) => {
      revalidate(async () => {
        const newField = await createField({
          type,
          name: 'nuevo_campo',
          title: 'Nuevo Campo',
          hint: 'Hint',
          description: 'Description',
          order: sortedFields.value[sortedFields.value.length - 1].order + 1,
        });

        return {
          ...cfp.value,
          fields: [
            ...cfp.value.fields,
            newField,
          ],
        };
      });
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
      await revalidate(async () => {
        const changedField = await updateField(
          editingFieldRef.value.id,
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

    const removeField = async () => {
      // optimistic update
      mutate(key.value, {
        ...cfp.value,
        fields: R.reject(R.propEq('id', editingFieldRef.value.id))(cfp.value.fields),
      });

      // actual update
      try {
        await deleteField(editingFieldRef.value.id);
        editingFieldRef.value = {};
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Failed to delete field', e);
      }

      // revalidate all fields positions
      revalidate();
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
      removeField,
    };
  },
};
</script>

<style lang="scss" scoped>
.cfp-admin-container {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--cfp-admin-background);

  h1 {
    margin: 0;
  }

  .cfp-form {
    flex: 1;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: left;
  }

  .cfp-toolbox {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 12.5rem;
    margin-right: 3.375rem;

    .field-add-button {
      text-align: left;
    }

    // eslint-disable-next-line vue-scoped-css/no-unused-selector
    .field-add-button + .field-add-button {
      margin-top: 0.312rem;
    }
  }

  .cfp-preview {
    width: 40rem;
    padding: 1rem 1.5rem;
    margin-bottom: -2rem;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .cfp-config {
    visibility: hidden;
    flex: 1;
    max-width: 12.5rem;
    margin-left: 3.375rem;
    display: flex;
    flex-direction: column;

    &.active {
      visibility: visible;
    }
  }

  .cfp-field-wrapper {
    padding: 1rem 2rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 0.062rem solid var(--cfp-admin-field-wrapper-border);
    border-radius: 0 0 0.25rem 0.25rem;
    cursor: pointer;

    &.active {
      border-color: var(--cfp-admin-field-wrapper-active-border);
    }
  }
}
</style>
