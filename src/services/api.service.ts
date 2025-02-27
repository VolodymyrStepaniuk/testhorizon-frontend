import axios from "axios";
import { apiConfig } from "../config/api.config";
import { UserCreateRequest } from "../models/user/UserCreateRequest";
import { LoginRequest } from "../models/auth/LoginRequest";
import { VerificationRequest } from "../models/auth/VerificationRequest";
import { PasswordResetRequest } from "../models/auth/PasswordResetRequest";
import { PasswordResetConfirmRequest } from "../models/auth/PasswordResetConfirmRequest";
import { UserResponse } from "../models/user/UserResponse";
import { UserUpdateRequest } from "../models/user/UserUpdateRequest";
import { TestCaseCreateRequest } from "../models/testcase/TestCaseCreateRequest";
import { TestCaseResponse } from "../models/testcase/TestCaseResponse";
import { TestCaseUpdateRequest } from "../models/testcase/TestCaseUpdateRequest";
import { TestCasePriority } from "../constants/enum/testCasePriorities";
import { TestCreateRequest } from "../models/test/TestCreateRequest";
import { TestUpdateRequest } from "../models/test/TestUpdateRequest";
import { TestResponse } from "../models/test/TestResponse";
import { TestType } from "../constants/enum/testTypes";
import { RatingUpdateRequest } from "../models/rating/RatingUpdateRequest";
import { RatingResponse } from "../models/rating/RatingResponse";
import { ProjectCreateRequest } from "../models/project/ProjectCreateRequest";
import { ProjectUpdateRequest } from "../models/project/ProjectUpdateRequest";
import { ProjectResponse } from "../models/project/ProjectResponse";
import { ProjectStatus } from "../constants/enum/projectStatuses";
import { CommentCreateRequest } from "../models/comment/CommentCreateRequest";
import { CommentUpdateRequest } from "../models/comment/CommentUpdateRequest";
import { CommentResponse } from "../models/comment/CommentResponse";
import { CommentEntityType } from "../constants/enum/commentEntityTypes";
import { BugReportCreateRequest } from "../models/bugreport/BugReportCreateRequest";
import { BugReportUpdateRequest } from "../models/bugreport/BugReportUpdateRequest";
import { BugReportResponse } from "../models/bugreport/BugReportResponse";
import { BugReportSeverity } from "../constants/enum/bugReportSeverities";
import { BugReportStatus } from "../constants/enum/bugReportStatuses";
import { FileEntityType } from "../constants/enum/fileEntityType";
import { getAccessToken } from "../utils/auth.utils";
import { PaginatedResponse } from "../types/pagination";

const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const API = {
  files: {
    upload: (entityType: FileEntityType, entityId: number, files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      return apiClient.post(
        `${apiConfig.endpoints.files}/${entityType}/${entityId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    delete: (
      entityType: FileEntityType,
      entityId: number,
      fileNames: string[],
      params?: {
        page?: number;
        size?: number;
      }
    ) =>
      apiClient.delete(
        `${apiConfig.endpoints.files}/${entityType}/${entityId}`,
        {
          params: { ...params, fileNames },
        }
      ),

    deleteFolder: (entityType: FileEntityType, entityId: number) =>
      apiClient.delete(
        `${apiConfig.endpoints.files}/delete-folder/${entityType}/${entityId}`
      ),

    list: (entityType: FileEntityType, entityId: number) =>
      apiClient.get(
        `${apiConfig.endpoints.files}/list/${entityType}/${entityId}`
      ),
  },
  bugReports: {
    create: (request: BugReportCreateRequest) =>
      apiClient.post<BugReportResponse>(
        apiConfig.endpoints.bugReports,
        request
      ),

    getById: (id: number) =>
      apiClient.get<BugReportResponse>(
        `${apiConfig.endpoints.bugReports}/${id}`
      ),

    update: (id: number, request: BugReportUpdateRequest) =>
      apiClient.patch<BugReportResponse>(
        `${apiConfig.endpoints.bugReports}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.bugReports}/${id}`),

    getAll: (params?: {
      page?: number;
      size?: number;
      projectId?: number;
      title?: string;
      reporterId?: number;
      severityName?: BugReportSeverity;
      status?: BugReportStatus;
    }) =>
      apiClient.get<PaginatedResponse<BugReportResponse, "bugReports">>(
        apiConfig.endpoints.bugReports,
        { params }
      ),
  },
  comments: {
    create: (request: CommentCreateRequest) =>
      apiClient.post<CommentResponse>(apiConfig.endpoints.comments, request),

    update: (id: number, request: CommentUpdateRequest) =>
      apiClient.patch<CommentResponse>(
        `${apiConfig.endpoints.comments}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.comments}/${id}`),

    getAll: (params?: { page?: number; size?: number; authorId?: number }) =>
      apiClient.get<PaginatedResponse<CommentResponse, "comments">>(
        `${apiConfig.endpoints.comments}/all`,
        { params }
      ),

    getByEntity: (params: {
      page?: number;
      size?: number;
      entityId: number;
      entityType: CommentEntityType;
    }) =>
      apiClient.get<PaginatedResponse<CommentResponse, "comments">>(
        apiConfig.endpoints.comments,
        { params }
      ),
  },
  projects: {
    create: (request: ProjectCreateRequest) =>
      apiClient.post<ProjectResponse>(apiConfig.endpoints.projects, request),

    getById: (id: number) =>
      apiClient.get<ProjectResponse>(`${apiConfig.endpoints.projects}/${id}`),

    update: (id: number, request: ProjectUpdateRequest) =>
      apiClient.patch<ProjectResponse>(
        `${apiConfig.endpoints.projects}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.projects}/${id}`),

    getAll: (params?: {
      page?: number;
      size?: number;
      ownerId?: number;
      title?: string;
      status?: ProjectStatus;
    }) =>
      apiClient.get<PaginatedResponse<ProjectResponse, "projects">>(
        apiConfig.endpoints.projects,
        { params }
      ),
  },
  ratings: {
    change: (request: RatingUpdateRequest) =>
      apiClient.post<RatingResponse>(apiConfig.endpoints.ratings, request),

    getAll: (params?: {
      page?: number;
      size?: number;
      userId?: number;
      ratedByUserId?: number;
    }) =>
      apiClient.get<PaginatedResponse<RatingResponse, "ratings">>(
        apiConfig.endpoints.ratings,
        { params }
      ),
  },
  auth: {
    register: (userCreateRequest: UserCreateRequest) =>
      apiClient.post<UserResponse>(
        `${apiConfig.endpoints.auth}/register`,
        userCreateRequest
      ),

    login: (loginRequest: LoginRequest) =>
      apiClient.post(`${apiConfig.endpoints.auth}/login`, loginRequest),

    verify: (verificationRequest: VerificationRequest) =>
      apiClient.post(`${apiConfig.endpoints.auth}/verify`, verificationRequest),

    resendVerification: (email: string) =>
      apiClient.post(`${apiConfig.endpoints.auth}/resend?email=${email}`),

    refreshToken: (refreshToken: string) =>
      apiClient.post(`${apiConfig.endpoints.auth}/refresh`, {
        headers: { Authorization: refreshToken },
      }),

    sendPasswordReset: (request: PasswordResetRequest) =>
      apiClient.post(
        `${apiConfig.endpoints.auth}/send-reset-password`,
        request
      ),

    resetPassword: (token: string, request: PasswordResetConfirmRequest) =>
      apiClient.post(
        `${apiConfig.endpoints.auth}/reset-password?token=${token}`,
        request
      ),
  },
  tests: {
    create: (request: TestCreateRequest) =>
      apiClient.post<TestResponse>(apiConfig.endpoints.tests, request),

    getById: (id: number) =>
      apiClient.get<TestResponse>(`${apiConfig.endpoints.tests}/${id}`),

    update: (id: number, request: TestUpdateRequest) =>
      apiClient.patch<TestResponse>(
        `${apiConfig.endpoints.tests}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.tests}/${id}`),

    getAll: (params?: {
      page?: number;
      size?: number;
      projectId?: number;
      authorId?: number;
      testCaseId?: number;
      type?: TestType;
    }) =>
      apiClient.get<PaginatedResponse<TestResponse, "tests">>(
        apiConfig.endpoints.tests,
        { params }
      ),
  },
  testCases: {
    create: (request: TestCaseCreateRequest) =>
      apiClient.post<TestCaseResponse>(apiConfig.endpoints.testCases, request),

    getById: (id: number) =>
      apiClient.get<TestCaseResponse>(`${apiConfig.endpoints.testCases}/${id}`),

    update: (id: number, request: TestCaseUpdateRequest) =>
      apiClient.patch<TestCaseResponse>(
        `${apiConfig.endpoints.testCases}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.testCases}/${id}`),

    getAll: (params?: {
      page?: number;
      size?: number;
      projectId?: number;
      authorId?: number;
      priority?: TestCasePriority;
    }) =>
      apiClient.get<PaginatedResponse<TestCaseResponse, "testCases">>(
        apiConfig.endpoints.testCases,
        { params }
      ),
  },
  users: {
    getById: (id: number) =>
      apiClient.get<UserResponse>(`${apiConfig.endpoints.users}/${id}`),

    getByEmail: (email: string) =>
      apiClient.get<UserResponse>(
        `${apiConfig.endpoints.users}/email/${email}`
      ),

    update: (id: number, request: UserUpdateRequest) =>
      apiClient.patch<UserResponse>(
        `${apiConfig.endpoints.users}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.users}/${id}`),

    getMe: () => apiClient.get<UserResponse>(`${apiConfig.endpoints.users}/me`),

    updateMe: (request: UserUpdateRequest) =>
      apiClient.patch<UserResponse>(`${apiConfig.endpoints.users}/me`, request),

    deleteMe: () => apiClient.delete(`${apiConfig.endpoints.users}/me`),

    getAll: (params: {
      page?: number;
      size?: number;
      ids?: number[];
      email?: string;
      fullName?: string;
    }) =>
      apiClient.get<PaginatedResponse<UserResponse, "users">>(
        apiConfig.endpoints.users,
        { params }
      ),

    getTopByRating: (params: { page?: number; size?: number }) =>
      apiClient.get<PaginatedResponse<UserResponse, "users">>(
        `${apiConfig.endpoints.users}/top`,
        { params }
      ),
  },
};
