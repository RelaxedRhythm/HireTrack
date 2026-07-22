import {
  User,
  Bell,
  Shield,
} from "lucide-react";


const settings = [
  {
    title: "Profile",
    description:
      "Manage your name, email and recruiter information.",
    icon: User,
  },
  {
    title: "Notifications",
    description:
      "Configure hiring alerts and updates.",
    icon: Bell,
  },
  {
    title: "Security",
    description:
      "Manage password and account security.",
    icon: Shield,
  },
];


export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">

      <div>
        <h1 className="text-3xl font-semibold">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>


      <div className="space-y-4">

        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex items-center gap-4
                rounded-xl border p-5
                hover:bg-muted/50
                transition
              "
            >
              <div className="rounded-lg bg-muted p-3">
                <Icon className="h-5 w-5"/>
              </div>


              <div>
                <h3 className="font-medium">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>

            </div>
          );
        })}

      </div>


      {/* Danger Zone */}
      <section
        className="
          rounded-xl border border-destructive/30
          p-5
        "
      >
        <h2 className="font-semibold text-destructive">
          Danger Zone
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Permanently delete your account and data.
        </p>

        <button
          className="
            mt-4 rounded-lg
            bg-destructive px-4 py-2
            text-sm text-white
          "
        >
          Delete Account
        </button>

      </section>

    </div>
  );
}