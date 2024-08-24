<script setup>
import Swal from 'sweetalert2'

const logout = () => {
  Swal.fire({
    title: 'Anda ingin Logout ',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('login')
      localStorage.removeItem('user')
      window.location.reload()
    }
  })
}
</script>
<template>
  <header class="app-header">
    <nav class="navbar navbar-expand-lg navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item d-block d-xl-none">
          <a
            class="nav-link sidebartoggler nav-icon-hover"
            id="headerCollapse"
            href="javascript:void(0)"
          >
            <i class="ti ti-menu-2"></i>
          </a>
        </li>
      </ul>
      <a @click.prevent="logout" class="btn btn-danger ms-auto"> Logout </a>
    </nav>
  </header>
</template>
