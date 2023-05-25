<script lang="tsx">
import { PropType } from 'vue';
import { Spin } from 'ant-design-vue'
import NoAuthPage from '@/views/error/401.vue'
import { usePermission } from '@/common/hooks/usePermission'

export default defineComponent({
  name: 'KsgPageWrapper',
  props: {
    footer: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    sumbitText: {
      type: String,
      default: '保存'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'submit'],
  setup (props, { emit, slots }) {
    const { hasPermission } = usePermission()
    const route = useRoute()

    const handleCancel = () => {
      emit('cancel')
    }

    const handleSubmit = () => {
      emit('submit')
    }

    const isAuth = computed(() => hasPermission(route.path))


    const renderFooter = () => {
      return <div class="bg-light-50 absolute w-full bottom-0 h-49px">
        <div class="flex justify-end w-full h-full items-center">
          <a-button class="mr-12px" onClick={handleCancel}>取消</a-button>
          <a-button class="mr-24px" type="primary" onClick={handleSubmit}>{props.sumbitText}</a-button>
        </div>
      </div>
    }

    return () => (
      <div class="h-full w-full relative flex-col y-hidden">
        {
          isAuth.value ? 
            <> 
              <div class={['flex-1 h-full', !props.footer ? '' : 'pb-73px']}>
                {slots.default && slots.default()}
              </div>
              {props.footer && renderFooter()}
            </> : 
            <NoAuthPage /> 
        }
      </div>
    );
  },
});
</script>
