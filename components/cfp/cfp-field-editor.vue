<template>
  <fragment>
    <cfp-field-input>
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
    </div>
  </fragment>
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

<style lang="scss" scoped>
.actions {
  margin-top: 1rem;
}
</style>
