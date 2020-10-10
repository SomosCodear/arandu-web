<template>
  <fragment>
    <cfp-field-input>
      Título:
      <arandu-input v-model="field.title" />
    </cfp-field-input>
    <cfp-field-input>
      Descripción:
      <arandu-input v-model="field.description" />
    </cfp-field-input>
    <cfp-field-input>
      Hint:
      <arandu-input v-model="field.hint" />
    </cfp-field-input>
    <cfp-field-input>
      Opciones:
    </cfp-field-input>
    <div
      v-for="(option, index) in field.options"
      :key="index"
      class="cfp-select-option"
    >
      <arandu-input v-model="option.title" />
      &nbsp;:&nbsp;
      <arandu-input v-model="option.value" />
    </div>
    <button @click="addOption()">
      Agregar Opcion
    </button>
  </fragment>
</template>

<script>
import * as R from 'ramda';

export default {
  props: {
    field: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const addOption = () => {
      props.field.options.push({
        title: 'Opción',
        value: 'Valor',
        description: '',
        order: R.compose(
          R.add(1),
          R.propOr(0, 'order'),
          R.last,
        )(props.field.options),
      });
    };

    return {
      addOption,
    };
  },
};
</script>

<style lang="scss" scoped>
// eslint-disable-next-line vue-scoped-css/no-unused-selector
.cfp-select-option {
  display: flex;
  flex-direction: row;

  & + & {
    margin-top: 0.5rem;
  }

  // eslint-disable-next-line vue-scoped-css/no-unused-selector
  input {
    width: 5rem;
  }
}
</style>
