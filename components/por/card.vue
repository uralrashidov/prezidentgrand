<template>
  <div class="por--card">
    <div class="por--card-header">
      <div class="por--card-logo">
        <span> Yutuq </span>
        <a-icon type="trophy" />
      </div>
      <button class="por--card-edit">
        <a-icon type="edit" />
      </button>
    </div>
    <div class="por--body-flex">
      <div class="row">
        <div class="col-lg-4">
          <div class="por--body-htext">
            Nomi: 
          </div>
        </div>
        <div class="col-lg-8">
          <div class="por--body-ptext">
            dsdsdsdsd
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="por--body-htext">
            Turi: 
          </div>
        </div>
        <div class="col-lg-8">
          <div class="por--body-ptext">
            dsdsdsdsd
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="por--body-htext">
            Fayl: 
          </div>
        </div>
        <div class="col-lg-8">
          <div class="por--body-ptext">
            dsdsdsdsd
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="por--body-htext">
            Qo‘shilgan vaqt:
          </div>
        </div>
        <div class="col-lg-8">
          <div class="por--body-ptext">
            dsdsdsdsd
          </div>
        </div>
      </div>
    </div>
    <div class="por--body-footer">
      <a-icon type="delete" theme="filled" />
    </div>
  </div>
</template>
<script>
export default {
    props: ['items']
}
</script>