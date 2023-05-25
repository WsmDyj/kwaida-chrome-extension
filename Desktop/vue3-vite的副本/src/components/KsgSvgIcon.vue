<template>
	<svg aria-hidden="true"
	     class="ksg-svg-icon"
	     :style="styless">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script lang="ts">
export default defineComponent({
  name: 'KsgSvgIcon',

  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#333'
    },
	  size: {
		  type: Number,
		  default: 16
	  }
  },

  setup (props) {
	  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
	  const fontSize = reactive({ default: '32px', small: '20px', large: '48px' });
	  const styless = computed(() => {
		  return {
			  fontSize: `${props.size}px`
		  };
	  });

    return {
      symbolId,
	    styless,
      fontSize
    }
  }
});
</script>
<style lang="less" scoped>
.ksg-svg-icon {
	width: 1em;
	height: 1em;
	fill: v-bind(color);
	vertical-align: middle;
	color: transparent;
}
</style>
