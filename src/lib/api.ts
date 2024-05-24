// src/lib/api.ts
import axiosInstance from "./axios";

// import { API_BASE_URL } from "$env/static/private";

let API_BASE_URL = "http://localhost:3333/api/v1";

// Authentication endpoints

export async function registerUser(userData: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/register`,
    userData,
  );
  return response.data;
}

export async function loginUser(credentials: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/login`,
    credentials,
  );
  return response.data;
}

export async function verifyEmail(data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/verify-email`,
    data,
  );
  return response.data;
}

export async function forgotPassword(data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/forgot-password`,
    data,
  );
  return response.data;
}

export async function resetPassword(data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/reset-password`,
    data,
  );
  return response.data;
}

export async function logoutUser() {
  const response = await axiosInstance.post(`${API_BASE_URL}/auth/logout`);
  return response.data;
}

// User endpoints

export async function getUserProfile() {
  const response = await axiosInstance.get(`${API_BASE_URL}/users/profile`);
  return response.data;
}

export async function updateUserProfile(userData: any) {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/users/profile`,
    userData,
  );
  return response.data;
}

export async function deleteUserProfile() {
  const response = await axiosInstance.delete(`${API_BASE_URL}/users/profile`);
  return response.data;
}

// Investor endpoints

export async function getShortlistedInvestors() {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/investors/shortlisted`,
  );
  return response.data;
}

export async function getInvestorById(investorId: string) {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/investors/${investorId}`,
  );
  return response.data;
}

export async function shortlistInvestor(investorId: string) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/shortlist`,
  );
  return response.data;
}

export async function getAllInvestors() {
  const response = await axiosInstance.get(`${API_BASE_URL}/investors`);
  return response.data;
}

export async function updateInvestorProfile(investorId: string, data: any) {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/investors/${investorId}/profile`,
    data,
  );
  return response.data;
}

export async function updateInvestorCompany(investorId: string, data: any) {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/investors/${investorId}/company`,
    data,
  );
  return response.data;
}

export async function updateInvestorInterests(investorId: string, data: any) {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/investors/${investorId}/interests`,
    data,
  );
  return response.data;
}

export async function addInvestedLocation(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/invested-locations`,
    data,
  );
  return response.data;
}

export async function addInvestedStage(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/invested-stages`,
    data,
  );
  return response.data;
}

export async function addInvestedIndustry(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/invested-industries`,
    data,
  );
  return response.data;
}

export async function addInvestedCountry(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/invested-countries`,
    data,
  );
  return response.data;
}

export async function addInvestorLanguage(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/languages`,
    data,
  );
  return response.data;
}

export async function addInvestorKeyword(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/keywords`,
    data,
  );
  return response.data;
}

export async function addInvestedCompany(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/invested-companies`,
    data,
  );
  return response.data;
}

export async function associateInvestorType(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/investors/${investorId}/investor-type`,
    data,
  );
  return response.data;
}

// Notification endpoints

export async function getUserNotifications(userId: string) {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/notifications/${userId}`,
  );
  return response.data;
}

export async function markNotificationRead(notificationId: string) {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/notifications/${notificationId}`,
  );
  return response.data;
}

export async function createNotification(data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/notifications/create`,
    data,
  );
  return response.data;
}

// Startup endpoints

export async function createStartup(startupData: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/startups/add`,
    startupData,
  );
  return response.data;
}

export async function getUserStartups() {
  const response = await axiosInstance.get(`${API_BASE_URL}/startups/me`);
  return response.data;
}

export async function getStartupById(startupId: string) {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/startups/${startupId}`,
  );
  return response.data;
}

export async function updateStartup(startupId: string, data: any) {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/startups/${startupId}`,
    data,
  );
  return response.data;
}

export async function deleteStartup(startupId: string) {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/startups/${startupId}`,
  );
  return response.data;
}

export async function getAllStartups() {
  const response = await axiosInstance.get(`${API_BASE_URL}/startups`);
  return response.data;
}

export async function expressStartupInterest(startupId: string) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/startups/${startupId}/interest`,
  );
  return response.data;
}

export async function updateStartupTeam(startupId: string, data: any) {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/startups/${startupId}/team`,
    data,
  );
  return response.data;
}

export async function updateStartupDealDetails(startupId: string, data: any) {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/startups/${startupId}/deal-details`,
    data,
  );
  return response.data;
}

export async function updateStartupPitchDeal(startupId: string, data: any) {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/startups/${startupId}/pitch-deal`,
    data,
  );
  return response.data;
}

export async function upvoteStartup(startupId: string) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/startups/${startupId}/upvote`,
  );
  return response.data;
}

export async function commentOnStartup(startupId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/startups/${startupId}/comment`,
    data,
  );
  return response.data;
}

export async function replyToComment(
  startupId: string,
  commentId: string,
  data: any,
) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/startups/${startupId}/comment/${commentId}/reply`,
    data,
  );
  return response.data;
}

export async function getCommentReplies(startupId: string, commentId: string) {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/startups/${startupId}/comment/${commentId}/replies`,
  );
  return response.data;
}

export async function shortlistStartup(startupId: string) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/startups/${startupId}/shortlist`,
  );
  return response.data;
}

export async function getShortlistedStartups() {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/startups/shortlisted`,
  );
  return response.data;
}

// Search endpoints
export async function searchStartups(query: any) {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/search/startups`,
    query,
  );
  return response.data;
}

// Match endpoints
export async function matchInvestor(investorId: string) {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/match/${investorId}`,
  );
  return response.data;
}

// Upload endpoints
export async function uploadStartupVideo(startupId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/uploads/video/${startupId}`,
    data,
  );
  return response.data;
}

export async function uploadStartupImage(startupId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/uploads/image/${startupId}`,
    data,
  );
  return response.data;
}

export async function uploadUserProfileImage(userId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/uploads/user/profile-image/${userId}`,
    data,
  );
  return response.data;
}

export async function uploadUserBannerImage(userId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/uploads/user/banner-image/${userId}`,
    data,
  );
  return response.data;
}

export async function uploadInvestorProfileImage(
  investorId: string,
  data: any,
) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/uploads/investor/profile-image/${investorId}`,
    data,
  );
  return response.data;
}

export async function uploadInvestorBannerImage(investorId: string, data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/uploads/investor/banner-image/${investorId}`,
    data,
  );
  return response.data;
}

export async function uploadStartupDocument(
  startupId: string,
  documentType: string,
  data: any,
) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/uploads/document/${startupId}/${documentType}`,
    data,
  );
  return response.data;
}

export async function getDocument(documentId: string) {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/uploads/document/${documentId}`,
  );
  return response.data;
}

// Conversation endpoints
export async function createConversation(data: any) {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/conversations/new`,
    data,
  );
  return response.data;
}

export async function getConversationById(conversationId: string) {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/conversations/${conversationId}`,
  );
  return response.data;
}

export async function getUserConversations() {
  const response = await axiosInstance.get(`${API_BASE_URL}/conversations`);
  return response.data;
}

// Lookups endpoints
export async function addIndustry(data: any) {
  const response = await axiosInstance.post(`${API_BASE_URL}/lookups/industry`, data);
  return response.data;
}

export async function getIndustries() {
  const response = await axiosInstance.get(`${API_BASE_URL}/lookups/industries`);
  return response.data;
}

export async function addStage(data: any) {
  const response = await axiosInstance.post(`${API_BASE_URL}/lookups/stage`, data);
  return response.data;
}

export async function getStages() {
  const response = await axiosInstance.get(`${API_BASE_URL}/lookups/stages`);
  return response.data;
}

export async function addInvestorRole(data: any) {
  const response = await axiosInstance.post(`${API_BASE_URL}/lookups/investor-role`, data);
  return response.data;
}

export async function getInvestorRoles() {
  const response = await axiosInstance.get(`${API_BASE_URL}/lookups/investor-roles`);
  return response.data;
}

export async function addTaxRelief(data: any) {
  const response = await axiosInstance.post(`${API_BASE_URL}/lookups/tax-relief`, data);
  return response.data;
}

export async function getTaxReliefs() {
  const response = await axiosInstance.get(`${API_BASE_URL}/lookups/tax-reliefs`);
  return response.data;
}