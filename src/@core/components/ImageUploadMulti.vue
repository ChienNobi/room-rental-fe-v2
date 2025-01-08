<script setup lang="ts">
import { upload as uploadImage } from '@/plugins/firebase/firebase'

interface Props {
  rounded?: boolean
  urls?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  rounded: false,
  urls: () => [],
})

const fileInput = ref<HTMLElement>()
const imageUrls = ref<string[]>([])
const rawFile = ref<File[]>([])

watch(() => props.urls, urls => {
  if (urls && urls.length)
    imageUrls.value = [...urls]
})

const previewImage = (e: Event) => {
  const target = e.target as HTMLInputElement

  const files = target.files as FileList

  rawFile.value = [...rawFile.value, ...files]

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const reader = new FileReader()

    reader.onload = (evt: ProgressEvent<FileReader>) => {
      if (evt.target && typeof evt.target.result === 'string')
        imageUrls.value.push(evt.target.result)
    }

    reader.readAsDataURL(file)
  }
}

const upload = async (folder = 'images'): Promise<string[]> => {
  const uploadedUrl = []
  for (const file of rawFile.value) {
    const url = await uploadImage(file, folder)

    uploadedUrl.push(url)
  }

  return [...props.urls, ...uploadedUrl]
}

const handleClick = () => {
  fileInput.value?.click()
}

const removeImage = (index: number) => {
  imageUrls.value.splice(index, 1)
  rawFile.value.splice(index, 1)
}

defineExpose({
  upload,
})
</script>

<template>
  <section class="tw-flex tw-gap-2 tw-flex-wrap mb-4">
    <div
      v-for="(imgUrl, index) in imageUrls" v-bind="$attrs" :key="index" class="upload-picture"
      :class="{ 'rounded-50': props.rounded }"
    >
      <div class="upload-picture--cover">
        <div class="upload-picture--tool d-flex" :class="{ 'rounded-50': props.rounded }">
          <!--          <VIcon icon="tabler-zoom-in" class="mr-1" title="zoom out" /> -->
          <VIcon icon="tabler-circle-minus" title="remove" @click="removeImage(index)" />
        </div>
        <img :src="imgUrl" alt="Selected Image" style="max-width: 100%; max-height: 100%;" :style="props.rounded ? 'height: 100%; border-radius: 50%;' : ''">
      </div>
    </div>
    <div class="upload-picture" @click="handleClick">
      <slot name="icon"><VIcon icon="tabler-plus" /></slot>
      <input
        ref="fileInput" type="file" accept="image/*" multiple
        @change="previewImage"
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-picture {
  --card-size: 150px;
  background-color:  rgb(var(--v-theme-background));
  border: 1px dashed rgb(var(--v-theme-grey-400));
  border-radius: 6px;
  width: var(--card-size);
  height: var(--card-size);
  cursor: pointer;
  @extend .flex-center;
  font-size: 1.5em;
  transition: all .3s ease-in;
  position: relative;

  &:hover {
    border-color: rgb(var(--v-theme-primary));
  }

  input {
    display: none;
  }

  img {
    object-fit: cover;
  }

  &--cover {
    width: 100%;
    height: 100%;
    position: relative;
    @extend .flex-center;
  }

  &--tool {
    position: absolute;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .3s ease-in;
    @extend .flex-center;
    &:hover {
      opacity: 1;
    }
  }

}
.icon--close {
  width: fit-content;
  margin: 2em auto 0;
}

.rounded-50 {
  border-radius: 50%;
}
</style>
