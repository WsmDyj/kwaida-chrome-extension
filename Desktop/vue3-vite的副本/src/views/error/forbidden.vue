<template>
	<div class="no-auth flex flex-vertical flex-center full-height">
		<div>
			<img :src="imgUrl" alt=""/>
		</div>
		<div class="tips">
			暂无权限，请联系
			<a :href="operator.url">
				{{`${operator.name}（${operator.userName}）`}}
			</a>
			添加
		</div>
	</div>
</template>

<script lang="ts">
import imgUrl from '@/assets/images/noAuth.png'

export default defineComponent({
  setup () {
    return {
      imgUrl,
	    operator: {
        name: 'xxx',
		    userName: 'xxx',
		    url: 'kim://username?username=xxxx'
	    }
    }
  }
});
</script>

<style scoped lang="less">
.no-auth {
	text-align: center;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	img {
		width: 208px;
		height: 208px;
	}

	.tips {
		margin-top: 24px;
		font-size: 20px;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: rgba(0, 0, 0, 0.65);
		line-height: 28px;
	}
}
</style>
