import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="terms site-wrapper">
        <div className="terms__header">
          <h1 className="terms__title">Privacy Policy</h1>
          <p className="terms__meta">Last Updated: 03.02.2025</p>
        </div>

        <div className="terms__body">
          <p>
            At PLACEHOLDER (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), we prioritize the security and confidentiality of your personal information. This Privacy Policy outlines how we gather, process, share, and safeguard your data when you visit PLACEHOLDER (the &ldquo;Site&rdquo;) and utilize our AI-generated image services and digital store, which offers a personal use option. By continuing to browse or engage with the Site, you acknowledge and agree to the terms of this policy.
          </p>

          <section className="terms__section">
            <h2>Data Controller</h2>
            <p>
              For the purposes of the General Data Protection Regulation (GDPR) and other applicable data protection laws, the data controller responsible for processing your personal data is:
            </p>
            <p>
              PLACEHOLDER<br />
              PLACEHOLDER<br />
              PLACEHOLDER<br />
              support@orchestra-art.com<br />
              PLACEHOLDER
            </p>
            <p>As the data controller, we determine the purposes and means of processing your personal data.</p>
            <p>For any inquiries regarding your personal data or GDPR-related requests, please contact us at the email provided above.</p>
          </section>

          <section className="terms__section">
            <h2>Data We Collect</h2>

            <h3>Personal Data You Provide</h3>
            <ul>
              <li><strong>Account Details:</strong> When you create an account, we collect your name, email address, password, date of birth, and billing address.</li>
              <li><strong>Purchase Records:</strong> Information related to transactions on our platform, including payment details, which are securely processed by third-party providers.</li>
              <li><strong>User-Generated Content:</strong> Any inputs or prompts you provide for generating AI-created images.</li>
            </ul>

            <h3>Data Collected Automatically</h3>
            <ul>
              <li><strong>Site Interaction Data:</strong> Information about your activities on our website, such as pages visited, features used, and time spent on different sections.</li>
              <li><strong>Device &amp; Technical Information:</strong> Includes your IP address, browser type, operating system, and unique device identifiers.</li>
              <li><strong>Cookies &amp; Tracking Technologies:</strong> We gather insights about your preferences and interactions with the site through cookies and similar technologies. (Refer to the Cookies and Tracking Technologies section for more details.)</li>
            </ul>

            <h3>Third-Party Data</h3>
            <p>Information collected from payment gateways used to securely process transactions, managed and handled by trusted third-party service providers.</p>
          </section>

          <section className="terms__section">
            <h2>How We Utilize Your Data</h2>
            <p>We handle personal data for the following purposes:</p>
            <ul>
              <li><strong>Account and Service Management:</strong> Facilitating account creation, processing payments, and providing access to AI-generated images.</li>
              <li><strong>User Experience Enhancement:</strong> Customizing content and recommendations to improve your interaction with our platform.</li>
              <li><strong>Optimization and Performance Analysis:</strong> Evaluating service usage to refine features, enhance functionality, and boost overall performance.</li>
              <li><strong>Regulatory Compliance and Security:</strong> Meeting legal requirements and implementing safeguards to prevent fraudulent activities.</li>
            </ul>
          </section>

          <section className="terms__section">
            <h2>Sharing and Disclosure of Personal Data</h2>
            <p>We do not sell or distribute your personal data to third parties, except in the following cases:</p>

            <h3>Third-Party Service Providers</h3>
            <p>We may share your personal information with trusted external partners who assist in operating our platform and delivering services, including:</p>
            <ul>
              <li>Payment processing companies to facilitate secure transactions.</li>
              <li>Cloud storage and hosting providers to manage and maintain website infrastructure.</li>
            </ul>

            <h3>Legal Obligations and Security</h3>
            <p>Your data may be disclosed if required by applicable laws, regulatory requests, or legal proceedings. Additionally, we may share information to enforce our Terms of Use, ensure user safety, or prevent fraudulent and unauthorized activities.</p>

            <h3>Business Changes</h3>
            <p>If our company undergoes a merger, acquisition, or asset sale, your personal information may be transferred as part of the business transition. In such events, we will keep you informed of any significant changes.</p>
          </section>

          <section className="terms__section">
            <h2>Your Data Protection Rights</h2>
            <p>In accordance with data protection regulations, you are entitled to certain rights regarding your personal information, including:</p>

            <h3>Access and Modification</h3>
            <p>You can request access to the personal data we have about you and ask for corrections if any details are inaccurate or incomplete. Additionally, you can update your information directly in your profile, including your email address, full name, date of birth, and address.</p>

            <h3>Data Portability</h3>
            <p>You have the right to obtain a copy of your personal data in a commonly used and structured format.</p>

            <h3>Right to Erasure</h3>
            <p>You may request the removal of your personal data, provided there are no legal obligations requiring its retention.</p>

            <h3>Restriction of Processing</h3>
            <p>Under specific conditions, you can ask us to limit the way we process your personal information.</p>
          </section>

          <section className="terms__section">
            <h2>Cookies and Tracking Methods</h2>
            <p>To improve your experience on our platform, we utilize cookies and other tracking technologies that help us understand your preferences. Cookies are small data files stored on your device that allow us to:</p>
            <ul>
              <li>Retain your preferences and keep you logged in.</li>
              <li>Monitor website traffic and analyze user interactions.</li>
            </ul>
            <p>You have the option to manage or disable cookies through your browser settings at any time.</p>
          </section>

          <section className="terms__section">
            <h2>PCI DSS Compliance</h2>
            <p>
              Our payment infrastructure adheres to the Payment Card Industry Data Security Standard (PCI DSS) to guarantee the secure handling of your payment details. We work exclusively with PCI DSS-compliant payment processors, ensuring that industry-standard security measures are applied to protect your financial data during transactions. Your payment information is never stored on our servers; instead, it is processed securely by trusted third-party providers.
            </p>
          </section>

          <section className="terms__section">
            <h2>Strong Customer Authentication (SCA) Compliance</h2>
            <p>
              Our payment system complies with the Strong Customer Authentication (SCA) requirements outlined in the Revised Payment Services Directive (PSD2). This regulation mandates multi-factor authentication to enhance the security of electronic transactions and prevent unauthorized access.
            </p>
            <p>In accordance with PSD2, PLACEHOLDER ensures the protection of online payments by:</p>
            <ul>
              <li>Implementing Strong Customer Authentication (SCA) to verify transactions and prevent fraudulent activities.</li>
              <li>Ensuring transparency in transaction fees, charges, and currency exchange rates.</li>
              <li>Upholding user privacy, guaranteeing that all payment processes follow PSD2 requirements, including secure data handling and obtaining explicit user consent.</li>
            </ul>
            <p>These security measures help safeguard transactions while ensuring full compliance with regulatory standards.</p>
          </section>

          <section className="terms__section">
            <h2>Data Security</h2>
            <p>
              We implement robust technical and organizational safeguards to protect your personal data from unauthorized access, modification, disclosure, or destruction. Our security measures include encryption, a secure server infrastructure, and strict access controls.
            </p>
          </section>

          <section className="terms__section">
            <h2>International Data Transfers</h2>
            <p>
              When accessing our services from outside the European Economic Area (EEA), your personal data may be transferred to and processed in countries with different data protection regulations. We implement all necessary safeguards to ensure your information remains secure and compliant with this Privacy Policy and relevant data protection laws.
            </p>
          </section>

          <section className="terms__section">
            <h2>Data Retention</h2>
            <p>
              We store your personal data only for the duration required to achieve the purposes outlined in this Privacy Policy, as well as to meet legal, regulatory, or compliance requirements. Once your data is no longer necessary, we ensure its secure deletion or anonymization.
            </p>
          </section>

          <section className="terms__section">
            <h2>Children&apos;s Data Protection</h2>
            <p>
              Our services are designed for users aged 13 and older and are not intended for children under this age. We do not knowingly gather personal data from minors. If we discover that information from a child under 13 has been unintentionally collected, we will take immediate action to remove it from our records.
            </p>
          </section>

          <section className="terms__section">
            <h2>Updates to This Privacy Policy</h2>
            <p>
              We may revise this Privacy Policy periodically to align with changes in our operations, legal obligations, or other necessary adjustments. Any modifications will take effect once published on our Site, and the &ldquo;Effective Date&rdquo; at the top will be updated accordingly. It is your responsibility to review this policy regularly to stay informed about any updates. By continuing to use the website after changes are posted, you acknowledge and agree to the updated terms.
            </p>
          </section>

          <section className="terms__section">
            <h2>Your Data Protection Rights under the GDPR</h2>
            <p>
              If you are a resident of the European Economic Area (EEA), you are entitled to additional protections under the General Data Protection Regulation (GDPR). This includes the right to file a complaint with your local data protection authority if you believe your privacy rights have been violated.
            </p>
          </section>

          <section className="terms__section">
            <h2>Contact Information</h2>
            <p>
              PLACEHOLDER<br />
              PLACEHOLDER<br />
              support@orchestra-art.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
