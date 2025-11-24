// app/privacy-policy/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy • LyricZone',
    description:
        'Learn how LyricZone collects, uses, and protects your information when you use our website.',
}

export default function PrivacyPolicyPage() {
    return (
        <main
            style={{
                maxWidth: '800px',
                margin: '40px auto',
                padding: '0 16px 48px',
                lineHeight: 1.6,
                fontSize: '0.95rem',
            }}
        >
            <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>
                Privacy Policy
            </h1>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                <strong>Last Updated:</strong> 24 November 2025
            </p>

            <p>
                LyricZone (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
                operates the LyricZone website (the &quot;Service&quot;), which
                provides access to song lyrics, artist information, and related music
                content. This page informs you of our policies regarding the collection,
                use, and disclosure of personal information when you use our Service.
            </p>
            <p>
                By using LyricZone, you agree to the collection and use of information
                in accordance with this policy.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>1. Information We Collect</h2>

            <h3 style={{ marginTop: '1rem' }}>1.1 Personal Information</h3>
            <p>
                We may collect personally identifiable information that you voluntarily
                provide to us, such as:
            </p>
            <ul>
                <li>Email address (if you contact us or sign up for updates)</li>
                <li>Name (if submitted through forms)</li>
            </ul>

            <h3 style={{ marginTop: '1rem' }}>1.2 Usage Data</h3>
            <p>
                We automatically collect information about how you access and use the
                Service. This may include:
            </p>
            <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited on LyricZone</li>
                <li>Time and date of visit</li>
                <li>Device type and operating system</li>
                <li>Referring URLs</li>
            </ul>
            <p>
                This data helps us understand how users interact with our website and
                improve performance.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>2. Cookies and Tracking Technologies</h2>
            <p>
                LyricZone uses cookies and similar technologies to improve user
                experience, analyze website traffic, and display advertisements.
            </p>
            <p>
                You can choose to disable cookies in your browser settings. Please note
                that disabling cookies may affect certain features of the site.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>3. Google AdSense &amp; Third-Party Advertising</h2>
            <p>
                LyricZone uses Google AdSense, a third-party advertising service
                provided by Google Inc.
            </p>
            <p>
                Google AdSense uses cookies and web beacons to display ads to users
                based on their visits to this and other websites. This enables the
                display of advertisements relevant to your interests.
            </p>
            <p>Google may collect information such as:</p>
            <ul>
                <li>Your IP address</li>
                <li>Pages you visit</li>
                <li>Interaction with ads</li>
            </ul>
            <p>
                You can learn more about how Google manages data in advertising products
                by visiting:{' '}
                <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noreferrer"
                >
                    https://policies.google.com/technologies/ads
                </a>
                .
            </p>
            <p>
                You can opt out of personalized advertising by visiting:{' '}
                <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    https://adssettings.google.com
                </a>
                .
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>4. How We Use Your Information</h2>
            <p>We use collected data to:</p>
            <ul>
                <li>Operate and maintain the website</li>
                <li>Improve user experience</li>
                <li>Analyze usage patterns</li>
                <li>Display relevant advertisements</li>
                <li>Prevent fraudulent activity</li>
            </ul>
            <p>
                We do not sell, trade, or rent personal information to third parties.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>5. Data Security</h2>
            <p>
                We take reasonable measures to protect your data. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee
                absolute security.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>6. External Links</h2>
            <p>
                LyricZone may contain links to external websites. We are not responsible
                for the privacy policies or content of third-party sites.
            </p>
            <p>
                We encourage users to read the privacy policies of any external sites
                they visit.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>7. Children&apos;s Information</h2>
            <p>
                LyricZone does not knowingly collect personal information from children
                under the age of 13. If you believe your child has provided us with
                personal information, please contact us immediately.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>8. Your Rights</h2>
            <p>
                Depending on your location, you may have the right to request access to
                your data, request deletion of your data, or request correction of
                inaccurate data.
            </p>
            <p>
                To exercise these rights, please contact us using the details below.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>9. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. Changes will be
                posted on this page with an updated revision date.
            </p>

            <hr style={{ margin: '24px 0' }} />

            <h2>10. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, you can contact us
                at:
            </p>
            <ul>
                <li>Email: support@lyriczone.com</li>
                <li>Website: https://lyriczone.app</li>
            </ul>

            <p style={{ marginTop: '2rem', color: '#777', fontSize: '0.85rem' }}>
                By using LyricZone, you acknowledge that you have read and understood
                this Privacy Policy.
            </p>
        </main>
    )
}