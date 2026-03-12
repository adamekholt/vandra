import { createClient } from "./client";

function getSupabase() {
  return createClient();
}

/* LOGIN */

export async function login(email: string, password: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

/* REGISTER */

export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const supabase = getSupabase();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) return { data: null, error };

  const user = data.user;

  if (user) {
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        user_id: user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        role: "user",
      });

    if (insertError) {
      return { data: null, error: insertError };
    }
  }

  return { data, error: null };
}

/* REQUEST PASSWORD RESET EMAIL */

export async function resetPassword(email: string) {
  const supabase = getSupabase();

  const redirectUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/reset-password`
      : undefined;

  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });
}

/* UPDATE PASSWORD AFTER EMAIL LINK */

export async function updatePassword(password: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  return { data, error };
}

/* LOGOUT */

export async function logout() {
  const supabase = getSupabase();

  const { error } = await supabase.auth.signOut();

  return { error };
}