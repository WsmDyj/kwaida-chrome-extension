<!--
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-20 19:17:58
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-07 20:20:19
 * @Description: 员工选择组件
-->
<template>
  <div class="ks-users">
    <div class="ks-tooltip ks-user">
      <div
        class="ks-user__img-container"
      >
        <img
          :src="value?.avatarUrl || value?.avatar || 'https://blobstore-nginx.staging.kuaishou.com/bs2/kimAvatar/77b69ac989dc4bd89e22715fe1f233f2'"
          alt="icon"
          class="ks-user__img"
        />
        <a :href="href" class="ks-user__kim-link">
          <img
            src="https://cdnfile.corp.kuaishou.com/kc/files/a/halo/kim.svg"
            alt="open-kim"
            class="ks-user__kim-img"
          />
        </a>
      </div>
      <div class="ks-user__name">{{ value?.name || value?.groupName }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<any>,
    },
  },
  setup (props) {
    return {
      href: props.value?.groupId
        ? `kim://thread?id=${props.value?.groupId}:4`
        : `kim://username?username=${props.value?.userName}`,
    };
  },
});
</script>
<style lang="less" scoped>
.ks-user {
  display: inline-flex;
  align-items: center;
  width: 100%;
}
.ks-users {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.ks-user__img-container {
  position: relative;
  width: 24px;
  height: 24px;
  overflow: hidden;
  vertical-align: middle;
}
.ks-user__img {
  width: 24px;
  height: 24px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 12px;
  border: 1px solid #ebedf0;
  box-sizing: border-box;
  object-fit: cover;
  transition: all 0.2s;
}
.ks-user:not(.no-kim) .ks-user__img-container:hover .ks-user__kim-link {
  top: 0;
}
.ks-user:not(.no-kim) .ks-user__img-container:hover .ks-user__img {
  top: -24px;
}
.ks-user__kim-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.ks-user__kim-link {
  position: absolute;
  left: 0;
  top: 24px;
  transition: all 0.2s;
}
.ks-user__name {
  margin-left: 4px;
  line-height: 22px;
  font-size: 14px;
  color: #252626;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}
</style>
