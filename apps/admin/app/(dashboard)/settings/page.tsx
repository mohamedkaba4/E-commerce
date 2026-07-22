export default function SettingsPage() {
  return (
    <section className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Settings</h1>

        <p className="mt-2 text-sm text-neutral-400">
          Configure your admin application and storefront.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">
            Store information
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Field label="Store name">
              <input
                type="text"
                defaultValue="Mavencrest"
                disabled
                className={inputClassName}
              />
            </Field>

            <Field label="Currency">
              <input
                type="text"
                defaultValue="USD"
                disabled
                className={inputClassName}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-lg font-semibold">
            Administration
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Authentication, admin roles, image uploads and deployment
            settings will be configured in later phases.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-lg bg-neutral-800 px-5 py-2.5 text-sm font-semibold text-neutral-500"
          >
            Save settings
          </button>
        </div>
      </div>
    </section>
  )
}

const inputClassName =
  'w-full cursor-not-allowed rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm text-neutral-500'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-300">
        {label}
      </span>

      {children}
    </label>
  )
}
