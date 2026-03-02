import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="terms site-wrapper">
        <div className="terms__header">
          <h1 className="terms__title">Terms of Use</h1>
          <p className="terms__meta">Effective Date: 02.03.2026</p>
        </div>

        <div className="terms__body">
          <p>
            Welcome to PLACEHOLDER website (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms of Use (&ldquo;Terms&rdquo;) govern your use of our website located at PLACEHOLDER (the &ldquo;Site&rdquo;) and the services we provide, including but not limited to the creation of AI-generated images, as well as the shop for users to buy digital content (collectively, the &ldquo;Services&rdquo;). The platform allows users to purchase and use images for both commercial and personal purposes. By accessing or using the Site and Services, you agree to comply with these Terms. If you do not agree to these Terms, you must immediately stop using the Site and Services.
          </p>

          <section className="terms__section">
            <h2>Acceptance of Terms</h2>
            <p>
              By registering an account, making use of the Services, or otherwise accessing the Site, you acknowledge and agree that you have read and understood these Terms. You also agree that you are at least 13 years of age to enter into these Terms.
            </p>
          </section>

          <section className="terms__section">
            <h2>Services Overview</h2>
            <p>We provide a platform for users to create AI-generated images and purchase digital content. Users can:</p>
            <ul>
              <li>Generate custom images using our AI tools.</li>
              <li>Purchase digital images from our shop.</li>
              <li>The scope of rights for using images from our shop, including personal use.</li>
            </ul>
          </section>

          <section className="terms__section">
            <h2>Account Registration and Responsibilities</h2>
            <p>
              In order to use certain features of the Site, you must create an account and provide accurate, current, and complete information as prompted by the registration process. You are solely responsible for maintaining the confidentiality of your account login details and for any and all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or other security breaches via our email &ndash; support@PLACEHOLDER.
            </p>
            <p>By registering for an account, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information at the time of registration.</li>
              <li>Keep your account information up to date.</li>
              <li>Be responsible for all actions performed under your account.</li>
              <li>Use the platform in compliance with these Terms and applicable laws.</li>
            </ul>
          </section>

          <section className="terms__section">
            <h2>Licensing Options</h2>
            <p>When you purchase an image, you acquire a license to use the image under the specific terms associated with the license type we offer.</p>

            <h3>License Types</h3>
            <p>Our platform offers one type of license:</p>
            <ul>
              <li><strong>Personal Use License:</strong> Grants rights to use the image for personal, non-commercial purposes.</li>
            </ul>

            <h3>Personal Use</h3>
            <p>Images licensed for Personal Use may be used for non-commercial purposes only. This includes:</p>
            <ul>
              <li>Personal projects (e.g., artwork, hobbyist websites).</li>
              <li>Social media use, as long as the images are not used for profit or commercial promotion.</li>
              <li>Educational use in non-commercial settings (e.g., school presentations, student projects).</li>
            </ul>
            <p>
              Personal use images cannot be sold, redistributed, or used in a manner that generates direct or indirect revenue. While we do not continuously monitor the use of images under the Personal Use License, we reserve the right to take legal action if we discover any violations of the license terms. This may include pursuing legal proceedings and seeking all applicable penalties and damages as allowed by law.
            </p>
          </section>

          <section className="terms__section">
            <h2>Image Use and Restrictions</h2>
            <p>All images on the platform, whether purchased or generated through the AI service, are subject to the following usage restrictions:</p>
            <ul>
              <li><strong>No Unlawful Use:</strong> You may not use images in any manner that is illegal, defamatory, obscene, or otherwise objectionable.</li>
              <li><strong>No Intellectual Property Infringement:</strong> You may not use images in a way that infringes the intellectual property rights of third parties.</li>
              <li><strong>No Sensitive or Restricted Content:</strong> You may not use images in content related to pornographic, defamatory, or hateful material, or in any manner that may violate the rights of individuals.</li>
            </ul>
            <p>You are solely responsible for the use of images in your projects and for ensuring compliance with all applicable laws.</p>
          </section>

          <section className="terms__section">
            <h2>Payment, Pricing, and Fees</h2>

            <h3>Payment Methods</h3>
            <p>We accept various payment methods, including credit cards and debit cards. By providing your payment details, you agree to pay for all purchases you make on our platform.</p>

            <h3>Pricing</h3>
            <p>The price of images and services on our platform is subject to change. All prices are listed in EUR currency unless otherwise specified. You will be charged the price displayed at the time of your purchase, and we reserve the right to adjust prices at any time.</p>

            <h3>Pack and Custom Top-Up Expiration Policy</h3>
            <p>By agreeing to these Terms of Service, you acknowledge and accept that all packs and custom top-ups are subject to an expiration period. These will expire 90 days from the date of purchase. We encourage you to plan your usage accordingly to make the most of your purchase.</p>

            <h3>Refund and Cancellation Policy</h3>
            <p>Due to the nature of digital goods, all sales of AI-generated images and image license are final and non-refundable. Exceptions may be made in cases where:</p>
            <ul>
              <li>The image is significantly different from the description or preview provided.</li>
              <li>A technical issue has prevented you from accessing or downloading the image.</li>
            </ul>
            <p>
              Refund requests must be submitted within 14 days of the purchase date and will be reviewed on a case-by-case basis. You may request the refund via our email &ndash; support@PLACEHOLDER.
            </p>
          </section>

          <section className="terms__section">
            <h2>Intellectual Property Rights</h2>

            <h3>Ownership</h3>
            <p>All AI-generated images are protected by copyright and other intellectual property laws. Unless otherwise stated in the license, we retain ownership of all intellectual property rights in the images generated or provided through our platform.</p>

            <h3>User-Generated Content</h3>
            <p>If you upload content or provide input for the creation of custom images, you retain ownership of your original materials, but you grant us a license to use that content to generate images and provide Services to you. By submitting content, you confirm that you have all necessary rights and permissions to use that content.</p>
          </section>

          <section className="terms__section">
            <h2>Prohibited Activities</h2>
            <p>When using our Services, you agree not to:</p>
            <ul>
              <li>Use the platform for any fraudulent or illegal activities.</li>
              <li>Attempt to reverse engineer or interfere with our AI tools or platform.</li>
              <li>Post or upload content that violates any third party&apos;s intellectual property rights, privacy rights, or any applicable laws.</li>
              <li>Use automated means (bots, scripts, etc.) to access the platform.</li>
            </ul>
          </section>

          <section className="terms__section">
            <h2>Termination of Services</h2>
            <p>We reserve the right to terminate your account or access to the Services at any time, with or without notice, if we suspect that you are violating these Terms or engaging in fraudulent or illegal activities. Upon termination, all rights granted to you under these Terms will immediately cease.</p>
          </section>

          <section className="terms__section">
            <h2>Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use our Services, including but not limited to:</p>
            <ul>
              <li>Loss of profits or revenue.</li>
              <li>Loss of data or business interruptions.</li>
              <li>Any unauthorized access to or use of our servers or any personal information stored therein.</li>
            </ul>
            <p>In no event shall our liability exceed the amount paid by you for the image or service that gave rise to the claim.</p>
          </section>

          <section className="terms__section">
            <h2>Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless PLACEHOLDER, its affiliates, officers, employees, and agents from any claims, damages, or expenses (including legal fees) arising from your violation of these Terms, misuse of the Services, or infringement of any third-party rights.</p>
          </section>

          <section className="terms__section">
            <h2>Modifications to the Terms</h2>
            <p>We reserve the right to modify these Terms at any time, and any changes will be effective upon posting on the Site. It is your responsibility to review these Terms regularly. Your continued use of the Services after any changes constitutes acceptance of the new Terms.</p>
          </section>

          <section className="terms__section">
            <h2>Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Lithuania, without regard to its conflict of law principles. Any disputes arising out of or in connection with these Terms, the Services, or your use of the Site shall be resolved through binding arbitration conducted in Vilnius, Lithuania.
            </p>
            <p>
              You agree to waive any right to participate in class-action lawsuits or other collective claims. The arbitration shall be conducted in accordance with the rules of the Vilnius Court of Commercial Arbitration, and the arbitration award shall be final and binding on all parties.
            </p>
            <p>For any questions or concerns about these Terms, or to request support, please contact us at: support@PLACEHOLDER</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
