<!--
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-05-10 15:39:47
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-10 15:39:47
 * @FilePath: /vue3-vite/src/components/KsgFormText.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="tsx">
export default defineComponent({
  name: 'KsgText',
  inheritAttrs: false,
  props: {
    value: { type: [String, Number] },
  },
  setup (props) {
    return () => <div class="text-14px leading-32px">{props.value || '-'}</div>;
  },
});
</script>
