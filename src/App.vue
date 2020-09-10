<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 2024146 */
  src: url('//at.alicdn.com/t/font_2024146_8et0qhpupq7.eot');
  src: url('//at.alicdn.com/t/font_2024146_8et0qhpupq7.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2024146_8et0qhpupq7.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2024146_8et0qhpupq7.woff') format('woff'),
  url('//at.alicdn.com/t/font_2024146_8et0qhpupq7.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2024146_8et0qhpupq7.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-app:before {
  content: "\e605";
}

.icon-search:before {
  content: "\e600";
}

.icon-mine:before {
  content: "\e601";
}

.icon-close:before {
  content: "\e602";
}



</style>
