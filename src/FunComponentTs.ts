import { h } from 'vue'
import type { SetupContext, SlotsType } from 'vue'
import type { CompProps, CompSlots } from './types'

export const FunComponentTs = <const ItemType, const LabelKey extends string>(
	props: CompProps<ItemType, LabelKey>,
	ctx: SetupContext<{}, SlotsType<CompSlots<ItemType, LabelKey>>>
) => {
	const children = props.labels.map((label) => {
		const key = label.key
		return h('div', { key }, ctx.slots[key] ? ctx.slots[key]({ label }) : key)
	})
	return h('div', {}, children)
}
