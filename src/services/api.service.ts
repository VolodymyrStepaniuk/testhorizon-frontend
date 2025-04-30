import axios from "axios";
import { apiConfig } from "./api.config";
import { UserCreateRequest } from "../models/user/UserCreateRequest";
import { LoginRequest } from "../models/auth/LoginRequest";
import { VerificationRequest } from "../models/auth/VerificationRequest";
import { EmailPasswordResetRequest } from "../models/auth/EmailPasswordResetRequest";
import { EmailPasswordResetConfirmRequest } from "../models/auth/EmailPasswordResetConfirmRequest";
import { UserResponse } from "../models/user/UserResponse";
import { UserUpdateRequest } from "../models/user/UserUpdateRequest";
import { TestCaseCreateRequest } from "../models/testcase/TestCaseCreateRequest";
import { TestCaseResponse } from "../models/testcase/TestCaseResponse";
import { TestCaseUpdateRequest } from "../models/testcase/TestCaseUpdateRequest";
import { TestCasePriority } from "../models/enum/testCasePriorities";
import { TestCreateRequest } from "../models/test/TestCreateRequest";
import { TestUpdateRequest } from "../models/test/TestUpdateRequest";
import { TestResponse } from "../models/test/TestResponse";
import { TestType } from "../models/enum/testTypes";
import { RatingUpdateRequest } from "../models/rating/RatingUpdateRequest";
import { RatingResponse } from "../models/rating/RatingResponse";
import { ProjectCreateRequest } from "../models/project/ProjectCreateRequest";
import { ProjectUpdateRequest } from "../models/project/ProjectUpdateRequest";
import { ProjectResponse } from "../models/project/ProjectResponse";
import { ProjectStatus } from "../models/enum/projectStatuses";
import { CommentCreateRequest } from "../models/comment/CommentCreateRequest";
import { CommentUpdateRequest } from "../models/comment/CommentUpdateRequest";
import { CommentResponse } from "../models/comment/CommentResponse";
import { CommentEntityType } from "../models/enum/commentEntityTypes";
import { BugReportCreateRequest } from "../models/bugreport/BugReportCreateRequest";
import { BugReportUpdateRequest } from "../models/bugreport/BugReportUpdateRequest";
import { BugReportResponse } from "../models/bugreport/BugReportResponse";
import { BugReportSeverity } from "../models/enum/bugReportSeverities";
import { BugReportStatus } from "../models/enum/bugReportStatuses";
import { FileEntityType } from "../models/enum/fileEntityType";
import { getAccessToken } from "../utils/auth.utils";
import { PaginatedResponse } from "../models/pagination";
import { UpdatePasswordRequest } from "../models/auth/UpdatePasswordRequest";
import { FileResponse } from "../models/file/FileResponse";
import { FeedbackCreateRequest } from "../models/feedback/FeedbackCreateRequest";
import { FeedbackResponse } from "../models/feedback/FeedbackResponse";
import { FeedbackUpdateRequest } from "../models/feedback/FeedbackUpdateRequest";
import { ExportFormat } from "../models/enum/exportFormat";
import { ExportEntityType } from "../models/enum/exportEntityTypes";
import { NotebookCreateRequest } from "../models/notebook/NotebookCreateRequest";
import { NotebookUpdateRequest } from "../models/notebook/NotebookUpdateRequest";
import { NotebookResponse } from "../models/notebook/NotebookResponse";
import { NoteCreateRequest } from "../models/notebook/note/NoteCreateRequest";
import { NoteUpdateRequest } from "../models/notebook/note/NoteUpdateRequest";
import { NoteResponse } from "../models/notebook/note/NoteResponse";
import { AuthorityName } from "../models/enum/authorityNames";
import { PostCategoryName } from "../models/enum/postCategoryName";
import { PostCreateRequest } from "../models/post/PostCreateRequest";
import { PostResponse } from "../models/post/PostResponse";
import { PostUpdateRequest } from "../models/post/PostUpdateRequest";

const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
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

      return apiClient.post<PaginatedResponse<FileResponse, "files">>(
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
      apiClient.get<PaginatedResponse<FileResponse, "files">>(
        `${apiConfig.endpoints.files}/list/${entityType}/${entityId}`
      ),

    fileByEntityTypeAndId: (
      entityType: FileEntityType,
      entityId: number,
      fileName: string
    ) =>
      apiClient.get<FileResponse>(
        `${apiConfig.endpoints.files}/${entityType}/${entityId}/${fileName}`
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
      projectIds?: number[];
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

    sendEmailPasswordReset: (request: EmailPasswordResetRequest) =>
      apiClient.post(
        `${apiConfig.endpoints.auth}/password-reset/request`,
        request
      ),

    emailResetPassword: (
      token: string,
      request: EmailPasswordResetConfirmRequest
    ) =>
      apiClient.post(
        `${apiConfig.endpoints.auth}/password-reset/confirm?token=${token}`,
        request
      ),
    updatePassword: (request: UpdatePasswordRequest) =>
      apiClient.post(
        `${apiConfig.endpoints.auth}/password-reset/update`,
        request
      ),
    registerUserByAdmin: (request: UserCreateRequest) =>
      apiClient.post<UserResponse>(
        `${apiConfig.endpoints.auth}/register/admin`,
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
      title?: string;
      projectIds?: number[];
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
      title?: string;
      projectIds?: number[];
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
    changeUserAuthority: (id: number, authority: AuthorityName) =>
      apiClient.patch(
        `${apiConfig.endpoints.users}/change-authority/${id}`,
        null,
        {
          params: { authority },
        }
      ),
  },

  feedbacks: {
    create: (request: FeedbackCreateRequest) =>
      apiClient.post<FeedbackResponse>(
        `${apiConfig.endpoints.feedbacks}`,
        request
      ),
    getById: (id: number) =>
      apiClient.get<UserResponse>(`${apiConfig.endpoints.users}/${id}`),
    update: (id: number, request: FeedbackUpdateRequest) =>
      apiClient.patch<FeedbackResponse>(
        `${apiConfig.endpoints.feedbacks}/${id}`,
        request
      ),
    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.feedbacks}/${id}`),
    getAll: (params?: {
      page?: number;
      size?: number;
      ownerId?: number;
      feedbackIds?: number[];
    }) =>
      apiClient.get<PaginatedResponse<FeedbackResponse, "feedbacks">>(
        apiConfig.endpoints.feedbacks,
        { params }
      ),
  },

  export: {
    getExportFile: async (
      entityType: ExportEntityType,
      entityId: number,
      exportFormat: ExportFormat
    ): Promise<Blob> => {
      const response = await apiClient.get(
        `${apiConfig.endpoints.export}/${entityType}/${entityId}`,
        {
          params: { format: exportFormat },
          responseType: "blob",
        }
      );
      return response.data;
    },
  },

  notebooks: {
    create: (request: NotebookCreateRequest) =>
      apiClient.post<NotebookResponse>(apiConfig.endpoints.notebooks, request),

    getById: (id: number) =>
      apiClient.get<NotebookResponse>(`${apiConfig.endpoints.notebooks}/${id}`),

    update: (id: number, request: NotebookUpdateRequest) =>
      apiClient.patch<NotebookResponse>(
        `${apiConfig.endpoints.notebooks}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.notebooks}/${id}`),

    getAll: (params?: {
      page?: number;
      size?: number;
      ownerId?: number;
      title?: string;
    }) =>
      apiClient.get<PaginatedResponse<NotebookResponse, "notebooks">>(
        apiConfig.endpoints.notebooks,
        { params }
      ),
  },
  notes: {
    create: (notebookId: number, request: NoteCreateRequest) =>
      apiClient.post<NoteResponse>(
        `${apiConfig.endpoints.notes}/${notebookId}`,
        request
      ),

    getById: (id: number) =>
      apiClient.get<NoteResponse>(`${apiConfig.endpoints.notes}/${id}`),

    update: (id: number, request: NoteUpdateRequest) =>
      apiClient.patch<NoteResponse>(
        `${apiConfig.endpoints.notes}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.notes}/${id}`),

    getAll: (params?: {
      page?: number;
      size?: number;
      notebookId?: number;
      title?: string;
    }) =>
      apiClient.get<PaginatedResponse<NoteResponse, "notes">>(
        apiConfig.endpoints.notes,
        { params }
      ),
  },
  posts: {
    create: (request: PostCreateRequest) =>
      apiClient.post<PostResponse>(apiConfig.endpoints.posts, request),

    getById: (id: number) =>
      apiClient.get<PostResponse>(`${apiConfig.endpoints.posts}/${id}`),

    update: (id: number, request: PostUpdateRequest) =>
      apiClient.patch<PostResponse>(
        `${apiConfig.endpoints.posts}/${id}`,
        request
      ),

    delete: (id: number) =>
      apiClient.delete(`${apiConfig.endpoints.posts}/${id}`),

    getAll: (params?: {
      page?: number;
      size?: number;
      ownerId?: number;
      title?: string;
      category?: PostCategoryName;
    }) =>
      apiClient.get<PaginatedResponse<PostResponse, "posts">>(
        apiConfig.endpoints.posts,
        { params }
      ),
  },
};
