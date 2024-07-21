import { h } from 'vue'

/**
 * @template const ItemType
 * @template {string} const LabelKey
 * @param {import('./types').CompProps<ItemType, LabelKey>} props
 * @param {import('vue').SetupContext<{}, import('vue').SlotsType<import('./types').CompSlots<ItemType, LabelKey>>>} ctx
 */
export const FunComponent = (props, ctx) => {
	const children = props.labels.map((label) => {
		const key = label.key
		return h('div', { key }, ctx.slots[key] ? ctx.slots[key]({ label }) : key)
	})
	return h('div', {}, children)
}
