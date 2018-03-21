<template>
    <hsc-window-style-metal>
      <hsc-window title="leaflet window"
                  :resizable="resizable"
                  :closeButton="closeButton"
                  :isOpen="isOpen"
                  @closebuttonclick="isOpen=false"
                  :minWidth="minWidth"
                  :minHeight="minHeight">
        {{message}}
        <lmap style="margin-left:10px;margin-bottom:10px"></lmap>
      </hsc-window>
    </hsc-window-style-metal>
</template>

<script>
// import Lmap from '@/directives/Map'

export default {
    name: 'map-window',
    data () {
        return {
            message: 'there is going to be a leaflet map here',
            resizable: true,
            closeButton: true,
            isOpen: true,
            minWidth: 500,
            minHeight: 500
        }
    },
    components: {
        // Lmap
    }
}
</script>