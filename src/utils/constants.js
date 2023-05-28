import { ref } from 'vue'

export const story_points = ref(['1', '2', '3', '5', '8', '13']);
  
export const priorities = ref([
    { level: 'Very Low' },
    { level: 'Low' },
    { level: 'Medium' },
    { level: 'High' },
    { level: 'Very High' }
]);

export const status = ref(['open', 'in progress', 'in review', 'done']);

export const issueColorClass = (priority) => {
    switch (priority) {
      case 'Very Low':
        return 'vlow-pr-card'
      case 'Low':
        return 'low-pr-card'
      case 'Medium':
        return 'medium-pr-card'
      case 'High':
        return 'high-pr-card'
      case 'Very High':
        return 'vhigh-pr-card'
      default:
        return 'medium-pr-card'
    }
  }
  
  export const priorityIconClass = (priority) => {
    switch (priority) {
      case 'Very Low':
        return 'pi pi-angle-double-down'
      case 'Low':
        return 'pi pi-angle-down'
      case 'Medium':
        return 'pi pi-bars'
      case 'High':
        return 'pi pi-angle-up'
      case 'Very High':
        return 'pi pi-angle-double-up'
      default:
        return 'pi-question-circle'
    }
  }