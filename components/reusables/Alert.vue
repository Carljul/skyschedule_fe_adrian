<template>
    <client-only>
      <notification-group group="notify">
        <div class="fixed inset-0 flex px-4 py-6 p-6 items-start justify-end pointer-events-none" style="z-index: 9999;">
          <div class="max-w-sm w-full">
            <notification tag="div" v-slot="{notifications, close}">
              <div
                class="flex max-w-sm w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4 relative pointer-events-auto"
                v-for="notification in notifications"
                :key="notification.id"
                role="alert"
              >
                <div :class="`flex justify-center items-center w-12 --bg-${notification.type ? notification.type : 'success'} --text-light`">
                  <!-- icon here -->

                  <svg v-if="notification.type == 'info'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <svg v-else-if="notification.type == 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>

                  <svg v-else-if="notification.type == 'danger'" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <div v-else-if="!notification.type && notification.icon" v-html="notification.icon"></div>

                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                </div>

                <div class="-mx-3 py-2 px-4">
                  <div class="mx-3">
                    <span :class="`--text-${notification.type ? notification.type : 'success'} font-semibold`">{{notification.title}}</span>
                    <div class="--text-dark text-sm pr-12" v-html="notification.html"></div>
                    <a href="#" @click="close(notification.id)" class="absolute top-0 bottom-0 right-0 px-4 py-3 shadow --text-dark flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </notification>
          </div>
        </div>
      </notification-group>
    </client-only>
</template>