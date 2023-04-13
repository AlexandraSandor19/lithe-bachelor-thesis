<script setup>
import { ref, computed } from 'vue';

const username = ref('johndoe');
const surname = ref('Doe');
const forename = ref('John');
const email = ref('johndoe@gmail.com');
const title = ref('Product Owner');
const teams = ref(['Gamma', 'Charlie', 'Delta']);
const projects = ref(['Marine Maps', 'Email Services', 'SSO Portal', 'Product Page']);

const fullname = computed(() => {
  return forename.value + ' ' + surname.value;
})

const adUsername = computed(() => {
  return `@${username.value}`;
})
</script>

<template>
    <div class="prf-section">
        <span class="prf-label">Personal profile</span>
        <Divider type="solid" class="m-2"/>
        <div class="flex flex-row h-9">
            <div class="flex flex-column w-max mr-5">
                <div class="image-section">
                    <img class='prf-image' src="https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg" alt="Image">
                    <div class="name-section">
                        <span class="fullname">{{ fullname }}</span>
                        <span class="username">{{ adUsername }}</span>
                    </div>
                </div>
                <span class="info-label">
                    <span class="pi pi-user mr-2" style="font-size: 0.9rem"></span>
                    About
                </span>
                <div class="container personal-details">
                    <div class="flex flex-row p-3 w-max">
                        <span class="detail-label">Title:</span>
                        <span>{{ title }}</span>
                    </div>
                    <div class="flex flex-row p-3 w-max">
                        <span class="detail-label">Email:</span>
                        <span>{{ email }}</span>
                    </div>
                </div>
                <span class="edit-btn">
                    <span class="pi pi-pencil"></span>
                    Update profile
                </span>   
            </div>
            <div class="flex flex-column w-full mt-2">
                <span class="info-label">
                    <span class="pi pi-chart-bar mr-2" style="font-size: 0.9rem"></span>
                    Activity
                </span>
                <div class="container activity-section">
                        <span class="flex align-items-center">
                            <span class="pi pi-angle-right mr-1"></span>
                            <span class="activity-label">Part of these teams..</span>
                        </span>
                        <div v-if="teams.length <= 3" v-for="team in teams" class="activity-list">
                            <Chip class="pl-0 pr-3 mt-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
                                <span class="chip-circle border-circle w-2rem h-2rem flex align-items-center justify-content-center">{{ team.charAt(0) }}</span>
                                <span class="chip-label">{{ team }}</span>
                            </Chip>   
                        </div>
                        <div v-else>
                            <div v-for="team in teams.slice(0,3)" class="activity-list">
                                <Chip class="pl-0 pr-3 mt-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
                                    <span class="chip-circle border-circle w-2rem h-2rem flex align-items-center justify-content-center">{{ team.charAt(0) }}</span>
                                    <span class="chip-label">{{ team }}</span>
                                </Chip>
                            </div>
                            <span class="see-more">Show more..</span>
                        </div>
                        <Divider />
                        <span class="flex align-items-center">
                            <span class="pi pi-angle-right mr-1"></span>
                            <span class="activity-label">Contributed to these projects..</span>
                        </span>
                        <div v-if="projects.length <= 3" v-for="project in projects" class="activity-list">
                            <Chip class="pl-0 pr-3 mt-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
                                <span class="chip-circle border-circle w-2rem h-2rem flex align-items-center justify-content-center">{{ project.charAt(0) }}</span>
                                <span class="chip-label">{{ project }}</span>
                            </Chip>   
                        </div>
                        <div v-else class="flex flex-column">
                            <div v-for="project in projects.slice(0,3)" class="activity-list">
                                <Chip class="pl-0 pr-3 mt-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
                                    <span class="chip-circle border-circle w-2rem h-2rem flex align-items-center justify-content-center">{{ project.charAt(0) }}</span>
                                    <span class="chip-label">{{ project }}</span>
                                </Chip>   
                            </div>
                            <span class="see-more">See more..</span>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .prf-section {
        display: flex;
        flex-direction: column;
        font-family: $pt-sans-font;
        padding: 1.3rem 3.2rem;
        min-width: 60rem;
        min-height: 40rem;
        padding-bottom: 0rem;
        background-color: $white;
        border-radius: 3px;
    }

    .prf-label {
        color: $dark-grey;
        font-size: 1.8rem;
    }

    .image-section {
        display: flex; 
        flex-direction: row;
        margin-top: 0.7rem;
        margin-bottom: 1.7rem;
        min-height: 225px;
        align-items: top;
    }

    .prf-image {
        width: 14rem;
        height: 14rem;
        border-radius: 50%;
        box-shadow: $shadow1;
    }

    .info-label {
        padding: 0.7rem 0 0.6rem 1rem;
        color: $grey;
        font-size: 0.9rem;
        font-weight: 700;
    }
 
    .name-section {
        display: flex;
        flex-direction: column;
        justify-content: end;
        margin-left: 1rem;
        width: max-content;

        .fullname {
            color: $black-1;
            font-size: 1.8rem;
        }

        .username {
            color: $black-2;
            font-size: 1rem;           
        }
    }

    .container {
        padding: 0.5rem 0 0.5rem 0;
        border: 1px solid #e7e7e7;
        border-radius: 5px;
        font-size: 0.9rem;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .personal-details {
        display: flex;
        flex-direction: column;
        width: max-content;
        width: 100%;
        padding: 0.7rem;
    }

    .detail-label {
        margin-right: 1rem;
        color: $black-1;
        font-weight: 600;
    }

    .activity-section {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 1rem 1.7rem;
    }

    .activity-list {
        display: flex;
        flex-direction: column;
        width: max-content;
    }

    .chip-circle {
        background: linear-gradient(180deg, rgba(94,55,109,1) 0%, rgb(210, 163, 219) 56%, rgb(127, 81, 135) 100%);
        color: white;
    }

    .activity-label {
        color: $dark-grey;
        font-size: 0.9rem;
        font-weight: 600;
    }

    .see-more {
        color: $grey;
        font-size: 0.9rem;
        margin: 1rem 0 0.5rem 0.5rem;
        cursor: pointer;
        width: fit-content;
    }

    .chip-label {
        margin-left: 0.5rem;
        font-size: 0.9rem;
        font-family: $pt-sans-font;
        color: $black-1;
    }

    .edit-btn {
        color: $grey;
        cursor: pointer;
        font-size: 0.9rem;
        border: 2px solid #AB80B4;
        width: fit-content;
        padding: 0.7rem 0.8rem;
        border-radius: 10px;
        margin-top: 0.9rem;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

</style>