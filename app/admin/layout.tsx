import { RequireAdmin } from "@/app/admin/components/require-admin";

export default function AdminLayout({
                                      children
                                    }: {
  children: React.ReactNode;
}) {
  return <RequireAdmin>{children}</RequireAdmin>;
}