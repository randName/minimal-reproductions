import type { VNode } from 'vue'

export type Label<ItemType, LabelKey extends string> = {
	key: LabelKey

	getValue: (i: ItemType) => string | number
}

export type CompProps<ItemType, LabelKey extends string> = {
	items: ItemType[]

	labels: Label<ItemType, LabelKey>[]
}

export type CompSlots<ItemType, LabelKey extends string> = Partial<
	Record<LabelKey, (c: { label: Label<ItemType, LabelKey> }) => VNode[]>
>
