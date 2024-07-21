<script setup>
import { FunComponent } from './FunComponent.js'
import { FunComponentTs } from './FunComponentTs'

const labels = [{ key: 'foo' }, { key: 'bar' }]
const items = [
	{ foo: 'hi', bar: 'baz' },
	{ foo: 'bye', bar: 'kek' },
]
</script>

<template>
	<FunComponent :items="items" :labels="labels">
		<template #foo="{ label }">{{ label }} ok foo</template>
		<template #bar="{ label }">{{ label }} hey bar</template>
	</FunComponent>
	<FunComponentTs :items="items" :labels="labels">
		<template #foo="{ label }">{{ label }} ok foo</template>
		<template #bar="{ label }">{{ label }} hey bar</template>
	</FunComponentTs>
</template>
