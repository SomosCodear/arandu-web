<template>
  <fragment>
    <cfp-field-input>
      Tipo:
      <arandu-select v-model="field.type">
        <option
          v-for="(name, type) in types"
          :key="type"
          :value="type"
        >
          {{ name }}
        </option>
      </arandu-select>
    </cfp-field-input>
    <cfp-field-input>
      Nombre:
      <arandu-input v-model="field.name" />
    </cfp-field-input>
    <component
      :is="fieldComponent"
      v-if="fieldComponent"
      :field="field"
    />
    <div class="actions">
      <button @click="$emit('save-changes')">
        Guardar
      </button>
      <button @click="$emit('cancel-changes')">
        Cancelar
      </button>
      <button @click="$emit('remove-field')">
        Eliminar
      </button>
    </div>
  </fragment>
</template>

<script>
import { computed } from '@vue/composition-api';
import { FIELD_NAMES } from '~/data/cfp';

export default {
  props: {
    field: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const fieldComponent = computed(() => {
      const fieldType = props.field.type;
      // eslint-disable-next-line prefer-template
      return () => import('./' + fieldType + '-field-editor');
    });

    return {
      fieldComponent,
      types: FIELD_NAMES,
    };
  },
};
</script>

<style lang="scss" scoped>
.actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  button + button {
    margin-top: 0.5rem;
  }
}
</style>
