const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'tbd_auth_token';
const USER_KEY = 'tbd_auth_user';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  },
  getUser: () => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = authStorage.getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch {
    return {
      ok: false,
      status: 0,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Unable to connect to the server. Please check your internet connection or verify the backend is running.',
      },
    };
  }

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    if (response.status === 401 && !endpoint.includes('/auth/login')) {
      authStorage.clear();
    }
    return {
      ok: false,
      status: response.status,
      error: data?.error || {
        code: `HTTP_${response.status}`,
        message: data?.message || `Request failed with status ${response.status}`,
      },
      details: data?.details,
    };
  }

  return {
    ok: true,
    status: response.status,
    data: data?.data ?? data,
    pagination: data?.pagination,
  };
}

/* =========================================================
   Public Endpoints
   ========================================================= */
export async function submitContactInquiry(formData) {
  // Clean payload: trim strings, omit empty optional strings
  const payload = {
    name: formData.name?.trim(),
    email: formData.email?.trim(),
    phone: formData.phone?.trim(),
    service: formData.service,
    message: formData.message?.trim(),
  };

  if (formData.organization?.trim()) {
    payload.organization = formData.organization.trim();
  }
  if (formData.budget?.trim()) {
    payload.budget = formData.budget.trim();
  }

  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/* =========================================================
   Authentication Endpoints
   ========================================================= */
export async function loginStaff({ email, password }) {
  const res = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim(), password }),
  });

  if (res.ok && res.data?.token) {
    authStorage.setToken(res.data.token);
    authStorage.setUser(res.data.user);
  }
  return res;
}

export async function fetchCurrentUser() {
  const res = await apiRequest('/auth/me', { method: 'GET' });
  if (res.ok && res.data?.user) {
    authStorage.setUser(res.data.user);
  }
  return res;
}

export async function changeStaffPassword({ currentPassword, newPassword }) {
  const res = await apiRequest('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (res.ok && res.data?.token) {
    authStorage.setToken(res.data.token);
    authStorage.setUser(res.data.user);
  }
  return res;
}

export async function logoutStaff() {
  try {
    await apiRequest('/auth/logout', { method: 'POST' });
  } finally {
    authStorage.clear();
  }
}

/* =========================================================
   Admin / Staff Inquiry Endpoints
   ========================================================= */
export async function fetchInquiries({ status, service, search, page = 1, limit = 20 } = {}) {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.append('status', status);
  if (service && service !== 'all') params.append('service', service);
  if (search?.trim()) params.append('search', search.trim());
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit);

  const queryString = params.toString();
  const res = await apiRequest(`/admin/inquiries${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
  });

  if (res.ok) {
    const raw = res.data;
    const list = Array.isArray(raw) ? raw : (raw?.inquiries || []);
    return {
      ...res,
      data: list,
      pagination: raw?.pagination || res.pagination,
    };
  }
  return res;
}

export async function fetchInquiryDetails(id) {
  const res = await apiRequest(`/admin/inquiries/${id}`, { method: 'GET' });
  if (res.ok) {
    const raw = res.data;
    const inquiry = raw?.inquiry || raw;
    return { ...res, data: { inquiry } };
  }
  return res;
}

export async function setInquiryClaim(id, claimed) {
  return apiRequest(`/admin/inquiries/${id}/claim`, {
    method: 'POST',
    body: JSON.stringify({ claimed: Boolean(claimed) }),
  });
}

export async function replyToInquiry(id, { subject, messageBody }) {
  return apiRequest(`/admin/inquiries/${id}/reply`, {
    method: 'POST',
    body: JSON.stringify({
      subject: subject?.trim() || undefined,
      messageBody: messageBody?.trim(),
    }),
  });
}

export async function updateInquiryStatus(id, status) {
  return apiRequest(`/admin/inquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

/* =========================================================
   Superadmin Settings Endpoints
   ========================================================= */
export async function fetchSystemSettings() {
  const res = await apiRequest('/admin/settings', { method: 'GET' });
  if (res.ok) {
    const raw = res.data;
    const settings = raw?.settings || raw;
    return { ...res, data: settings };
  }
  return res;
}

export async function updateSystemSettings({ contactEmailNotificationsEnabled }) {
  const res = await apiRequest('/admin/settings', {
    method: 'PATCH',
    body: JSON.stringify({ contactEmailNotificationsEnabled }),
  });
  if (res.ok) {
    const raw = res.data;
    const settings = raw?.settings || raw;
    return { ...res, data: settings };
  }
  return res;
}

/* =========================================================
   Superadmin Staff Management Endpoints
   ========================================================= */
export async function fetchStaffList() {
  const res = await apiRequest('/admin/staff', { method: 'GET' });
  if (res.ok) {
    const raw = res.data;
    const list = Array.isArray(raw) ? raw : (raw?.staff || []);
    return { ...res, data: list };
  }
  return res;
}

export async function createStaffMember({ name, email, password }) {
  const res = await apiRequest('/admin/staff', {
    method: 'POST',
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      password,
    }),
  });
  if (res.ok) {
    const raw = res.data;
    return { ...res, data: raw?.staff || raw };
  }
  return res;
}

export async function toggleStaffActiveStatus(id, isActive) {
  return apiRequest(`/admin/staff/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive: Boolean(isActive) }),
  });
}
