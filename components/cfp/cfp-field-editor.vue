<template>
  <div>
    <label>
      Tipo:
      <arandu-select v-model="field.type">
        <option value="title">
          Título
        </option>
        <option value="input">
          Campo de texto
        </option>
        <option value="select">
          Selección simple
        </option>
      </arandu-select>
    </label>
    <label>
      Nombre:
      <arandu-input v-model="field.name" />
    </label>
    <component
      :is="fieldComponent"
      v-if="fieldComponent"
      :field="field"
    />
    <button @click="$emit('save-changes')">
      Guardar
    </button>
    <button @click="$emit('cancel-changes')">
      Cancelar
    </button>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';

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
    };
  },
};
</script>
