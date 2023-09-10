<template>
    <div class="input-group color-picker w-fit relative" ref="colorpicker">
        <button type="button" @click="showPicker" :class="`${inputclass?inputclass:''} flex items-center bg-white hover:bg-gray-100 text-gray-800 py-1 px-2 border border-gray-300 rounded shadow text-xs`">
            <span class="colorvalue rounded-full mr-2 inline-block" :style="`background: ${colorValue?colorValue:'#000000'};`"></span>
            <span class="colorvaluetext">{{colorValue?colorValue:'#000000'}}</span>
        </button>
        <span class="input-group-addon color-picker-container absolute top-0 left-0 z-50">
            <span class="current-color" :style="`background-color: ${colorValue}`" @click="togglePicker()"></span>
            <chrome-picker :value="colors" @input="updateFromPicker" v-if="displayPicker" />
        </span>
    </div>
</template>
<script>
import { Chrome } from 'vue-color';
export default {
    components: {
        'chrome-picker': Chrome
    },
    props: ['color', 'value', 'inputclass'],
	data() {
		return {
			colors: {
				hex: '#000000',
			},
			colorValue: '',
			displayPicker: false,
		}
	},
	mounted() {
        if( this.value ) {
            this.setColor(this.value);
        }
	},
	methods: {
		setColor(color) {
			this.updateColors(color);
			this.colorValue = color;
		},
		updateColors(color) { if(!color) { return; }
			if(color.slice(0, 1) == '#') {
				this.colors = {
					hex: color
				};
			}
			else if(color.slice(0, 4) == 'rgba') {
				var rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
					hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
				this.colors = {
					hex: hex,
					a: rgba[3],
				}
			}
		},
		showPicker() {
			document.addEventListener('click', this.documentClick);
			this.displayPicker = true;
		},
		hidePicker() {
			document.removeEventListener('click', this.documentClick);
			this.displayPicker = false;
		},
		togglePicker() {
			this.displayPicker ? this.hidePicker() : this.showPicker();
		},
		updateFromInput() {
			if(/^#[0-9A-F]{6}$/i.test(this.colorValue)) {
				this.updateColors(this.colorValue);
			} else {
				return false;
			}
		},
		updateFromPicker(color) {
			this.colors = color;
			if(color.rgba.a == 1) {
				this.colorValue = color.hex;
			}
			else {
				this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
			}
		},
		documentClick(e) {
			try {
				var el = this.$refs.colorpicker,
					target = e.target;
				if(el !== target && !el.contains(target)) {
					this.hidePicker()
				}
			} catch($e) { return; }
		}
	},
	watch: {
		value(val) {
			this.colorValue = val;
		},
		colorValue(val) {
			this.updateColors(val);
			this.$emit('input', val);
		}
	}
}
</script>

<style lang="scss" scoped>
.colorvalue {
    width: 20px;
    height: 20px;
}
</style>