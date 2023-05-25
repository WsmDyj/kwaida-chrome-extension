type menuItemModel = {
	key: string;
	title: string;
	icon: string;
}

// 菜单栏数据结构模型
export type menuListModel = {
	key: string;
	icon: string;
	title: string;
	children: menuItemModel[]
}
