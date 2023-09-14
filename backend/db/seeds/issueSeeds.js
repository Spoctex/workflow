const issues = JSON.parse(`[
    {
      "creatorId": 12,
      "projectId": 2,
      "title": "Fix Login Page Issue",
      "description": "Users are encountering login issues on the website. This needs to be addressed promptly to ensure a smooth user experience.",
      "status": "ToDo",
      "priority": "High",
      "label": "Bug"
    },
    {
      "creatorId": 12,
      "projectId": 4,
      "title": "Improve Performance",
      "description": "The application is running slowly, affecting user satisfaction. Optimize performance for better user experience.",
      "status": "In Progress",
      "priority": "Urgent",
      "label": "Improvement"
    },
    {
      "creatorId": 1,
      "projectId": 5,
      "title": "Enhance UI Design",
      "description": "UI improvements needed to make the app more user-friendly and visually appealing.",
      "status": "Backlog",
      "priority": "Medium",
      "label": "Improvement"
    },
    {
      "creatorId": 12,
      "projectId": 2,
      "title": "Resolve Database Error",
      "description": "There's a critical database error causing data loss. This issue must be resolved immediately.",
      "status": "In Progress",
      "priority": "High",
      "label": "Bug"
    },
    {
      "creatorId": 1,
      "projectId": 4,
      "title": "Add New Feature",
      "description": "Implement a new feature to enhance user experience. Users have requested this functionality.",
      "status": "ToDo",
      "priority": "Medium",
      "label": "Feature"
    },
    {
      "creatorId": 12,
      "projectId": 4,
      "title": "Fix Broken Links",
      "description": "Several links on the website are broken, leading to a poor user experience. These need to be fixed ASAP.",
      "status": "Done",
      "priority": "Low",
      "label": "Bug"
    },
    {
      "creatorId": 1,
      "projectId": 1,
      "title": "Update Documentation",
      "description": "Documentation needs to be updated with the latest changes and features for user reference.",
      "status": "ToDo",
      "priority": "Medium",
      "label": "Improvement"
    },
    {
      "creatorId": 12,
      "projectId": 4,
      "title": "Implement Security Patch",
      "description": "A critical security vulnerability has been identified. Apply the necessary security patch immediately.",
      "status": "In Progress",
      "priority": "Urgent",
      "label": "Bug"
    },
    {
      "creatorId": 1,
      "projectId": 6,
      "title": "Design Landing Page",
      "description": "Create an eye-catching landing page to attract more visitors to the website.",
      "status": "Backlog",
      "priority": "High",
      "label": "Feature"
    },
    {
      "creatorId": 12,
      "projectId": 4,
      "title": "Optimize API Calls",
      "description": "Reduce the number of unnecessary API calls to improve app performance and reduce server load.",
      "status": "Done",
      "priority": "Medium",
      "label": "Improvement"
    },
    {
      "creatorId": 12,
      "projectId": 5,
      "title": "Fix User Registration Issue",
      "description": "Users are unable to register on the platform. Investigate and resolve the issue.",
      "status": "ToDo",
      "priority": "High",
      "label": "Bug"
    },
    {
      "creatorId": 12,
      "projectId": 6,
      "title": "Implement Feedback System",
      "description": "Allow users to provide feedback and suggestions for improving the app.",
      "status": "Backlog",
      "priority": "Medium",
      "label": "Improvement"
    },
    {
      "creatorId": 12,
      "projectId": 5,
      "title": "Enhance Search Functionality",
      "description": "Improve the search feature to provide more accurate and relevant results to users.",
      "status": "ToDo",
      "priority": "High",
      "label": "Feature"
    },
    {
      "creatorId": 12,
      "projectId": 6,
      "title": "Fix Payment Gateway Issue",
      "description": "Users are facing payment failures. Investigate and resolve the payment gateway issue.",
      "status": "In Progress",
      "priority": "High",
      "label": "Bug"
    },
    {
      "creatorId": 12,
      "projectId": 2,
      "title": "Update User Profile Page",
      "description": "Revamp the user profile page with new features and a modern design.",
      "status": "Canceled",
      "priority": "Low",
      "label": "Improvement"
    },
    {
      "creatorId": 1,
      "projectId": 1,
      "title": "Improve User Onboarding",
      "description": "Simplify the onboarding process to help new users get started quickly and easily.",
      "status": "In Progress",
      "priority": "Medium",
      "label": "Improvement"
    },
    {
      "creatorId": 1,
      "projectId": 6,
      "title": "Add Social Media Sharing",
      "description": "Allow users to share content on social media platforms directly from the app.",
      "status": "Done",
      "priority": "High",
      "label": "Feature"
    },
    {
      "creatorId": 1,
      "projectId": 3,
      "title": "Fix Mobile App Crashes",
      "description": "The mobile app is crashing frequently. Investigate and fix the crashes to improve stability.",
      "status": "In Progress",
      "priority": "Urgent",
      "label": "Bug"
    },
    {
      "creatorId": 1,
      "projectId": 2,
      "title": "Implement Two-Factor Authentication",
      "description": "Enhance security by adding two-factor authentication for user accounts.",
      "status": "ToDo",
      "priority": "Urgent",
      "label": "Improvement"
    },
    {
      "creatorId": 1,
      "projectId": 4,
      "title": "Update Payment Processing",
      "description": "Update the payment processing system to support new payment methods.",
      "status": "In Progress",
      "priority": "Urgent",
      "label": "Feature"
    },
    {
      "creatorId": 1,
      "projectId": 4,
      "title": "Fix User Account Deletion",
      "description": "Users are unable to delete their accounts. Implement a fix for this issue.",
      "status": "Done",
      "priority": "Low",
      "label": "Bug"
    },
    {
      "creatorId": 12,
      "projectId": 5,
      "title": "Improve Reporting Dashboard",
      "description": "Enhance the reporting dashboard to provide more insightful analytics for users.",
      "status": "ToDo",
      "priority": "Medium",
      "label": "Improvement"
    },
    {
      "creatorId": 12,
      "projectId": 6,
      "title": "Fix Email Notifications",
      "description": "Users are not receiving email notifications. Investigate and resolve the issue.",
      "status": "Canceled",
      "priority": "Low",
      "label": "Bug"
    },
    {
      "creatorId": 12,
      "projectId": 2,
      "title": "Implement User Feedback System",
      "description": "Allow users to provide feedback and suggestions for improving the application.",
      "status": "Canceled",
      "priority": "Medium",
      "label": "Improvement"
    },
    {
      "creatorId": 1,
      "projectId": 1,
      "title": "Enhance User Profile Editing",
      "description": "Improve the user profile editing functionality with new features and options.",
      "status": "In Progress",
      "priority": "High",
      "label": "Feature"
    },
    {
      "creatorId": 1,
      "projectId": 6,
      "title": "Optimize Search Algorithm",
      "description": "Optimize the search algorithm for faster and more accurate results.",
      "status": "Done",
      "priority": "Medium",
      "label": "Improvement"
    },
    {
      "creatorId": 1,
      "projectId": 3,
      "title": "Fix Push Notification Issue",
      "description": "Users are not receiving push notifications. Investigate and resolve the issue.",
      "status": "In Progress",
      "priority": "Urgent",
      "label": "Bug"
    },
    {
      "creatorId": 1,
      "projectId": 2,
      "title": "Add Dark Mode",
      "description": "Implement a dark mode feature to provide users with a more comfortable viewing experience.",
      "status": "ToDo",
      "priority": "Urgent",
      "label": "Feature"
    }
  ]`)

  const issueAmount = issues.length;

  module.exports = {issues, issueAmount}