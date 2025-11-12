import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Login
 * A simple login form with username and password fields following the Ocean Professional theme.
 * - Client-side validation ensures fields are not empty.
 * - Placeholder submit handler reads environment variables (REACT_APP_BACKEND_URL, REACT_APP_API_BASE)
 *   and logs an intent to POST to `${BASE}/auth/login` without sending a request.
 * Accessibility:
 * - Uses labels tied to inputs via htmlFor and id.
 * - Uses aria-invalid and aria-describedby on inputs when errors present.
 * - Button has aria-label and disables during submission.
 */
function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const baseUrl =
    (process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_BASE || '').replace(/\/+$/, '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Username is required.';
    if (!form.password.trim()) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Placeholder: do not actually send the request.
    // Log intent to POST to `${baseUrl}/auth/login`
    // Include note about body shape, but don't perform fetch.
    const target = `${baseUrl}/auth/login`;
    // eslint-disable-next-line no-console
    console.log('LOGIN INTENT -> POST', target, {
      body: { username: form.username, password: '•••••' },
    });

    // Simulate small delay to show disabled state
    setTimeout(() => {
      setSubmitting(false);
      // eslint-disable-next-line no-alert
      alert('Login submission captured (placeholder). Check console for the intended POST target.');
    }, 300);
  };

  return (
    <main className="login-page" style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <section className="login-container" aria-labelledby="login-title">
        <div className="surface-card">
          <div className="header-area">
            <h1 id="login-title" className="login-title">Welcome back</h1>
            <p className="login-subtitle">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} noValidate aria-describedby="login-helper">
            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                aria-required="true"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? 'username-error' : undefined}
                autoComplete="username"
              />
              {errors.username ? (
                <span id="username-error" className="error-text" role="alert">
                  {errors.username}
                </span>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                aria-required="true"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                autoComplete="current-password"
              />
              {errors.password ? (
                <span id="password-error" className="error-text" role="alert">
                  {errors.password}
                </span>
              ) : null}
            </div>

            <button
              type="submit"
              className="btn-primary"
              aria-label="Login"
              disabled={submitting}
            >
              {submitting ? 'Signing in...' : 'Login'}
            </button>
            <p id="login-helper" className="helper-note" aria-live="polite">
              This form uses a placeholder submit and will not contact the server.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
