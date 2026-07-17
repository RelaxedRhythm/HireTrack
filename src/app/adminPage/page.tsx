import { requireAdmin } from "../../lib/authorization";

export default async function AdminPage() {

    await requireAdmin();

    return <div>Admin Settings</div>;
}