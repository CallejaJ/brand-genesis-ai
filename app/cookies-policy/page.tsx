export default function CookiesPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. What Are Cookies
        </h2>
        <p>
          Cookies are small text files that are placed on your computer or
          mobile device by websites that you visit. They are widely used in
          order to make websites work, or work more efficiently, as well as to
          provide information to the owners of the site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. How We Use Cookies
        </h2>
        <p>We use cookies for the following purposes:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Essential Cookies:</strong> These are cookies that are
            required for the operation of our website.
          </li>
          <li>
            <strong>Analytical/Performance Cookies:</strong> They allow us to
            recognize and count the number of visitors and to see how visitors
            move around our website when they are using it.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> These are used to recognize
            you when you return to our website.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Managing Cookies
        </h2>
        <p>
          Most web browsers allow some control of most cookies through the
          browser settings. To find out more about cookies, including how to see
          what cookies have been set, visit www.aboutcookies.org or
          www.allaboutcookies.org.
        </p>
      </div>
    </div>
  );
}
