import prisma from "./lib/prisma.ts";

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Create test user
  const user = await prisma.user.create({
    data: {
      username: "testuser",
      hashedPassword: "hashed_pw_here", // never plain text in real life
    },
  });

  // 2️⃣ Blog with rich text
    const blog1 = await prisma.blog.create({
    data: {
        title: "Welcome to the Blog Platform",
        content: `
        <h2>Introduction</h2>
        <p>
            Welcome to this blog platform. This project was built as a full-stack
            learning experience and serves as a foundation for experimenting with
            modern web technologies. The goal is not only to display content, but
            to understand how data flows from database to backend to frontend in a
            clean and secure way.
        </p>

        <h2>Technology Stack</h2>
        <p>
            The platform is built using <strong>React</strong> for the frontend,
            <strong>Express</strong> for the backend, and <strong>Prisma</strong>
            as the ORM. Authentication is handled using <strong>JSON Web Tokens</strong>,
            allowing secure and stateless user sessions.
        </p>

        <p>
            Rich text content is stored as sanitized HTML, which makes it flexible
            and easy to render while still maintaining security against common
            vulnerabilities like cross-site scripting.
        </p>

        <h2>Key Features</h2>
        <ul>
            <li>Create and read blog posts with rich formatting</li>
            <li>User authentication using JWT</li>
            <li>Comment system with author attribution</li>
            <li>Clean separation between frontend and backend</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
            This platform is intentionally simple, but it is designed to scale.
            Features like editing posts, deleting comments, or adding likes can
            be layered on top without changing the core architecture.
        </p>

        <blockquote>
            Building software is a process of continuous improvement.
        </blockquote>
        `,
        userId: user.id,
    },
    });


    const blog2 = await prisma.blog.create({
    data: {
        title: "Handling Long Content and Edge Cases in Modern Web Apps",
        content: `
        <h2>Why Long Content Matters</h2>
        <p>
            Long-form content is one of the best ways to stress test a user interface.
            It reveals issues with spacing, typography, responsiveness, and word
            wrapping that short placeholder text never exposes. A serious application
            must handle large amounts of text gracefully.
        </p>

        <h2>Word Wrapping and Overflow</h2>
        <p>
            Sometimes users include extremely long words or URLs such as
            SupercalifragilisticexpialidociousEvenThoughTheSoundOfItIsSomethingQuiteAtrocious
            which can easily break layouts if not handled correctly. Proper CSS rules
            like <code>overflow-wrap: break-word</code> are essential.
        </p>

        <h2>Performance Considerations</h2>
        <p>
            Rendering large HTML blocks can be expensive if done incorrectly.
            By storing pre-formatted HTML and sanitizing it before rendering,
            the frontend can display content efficiently without additional parsing.
        </p>

        <h2>User Experience</h2>
        <p>
            From the user's perspective, long content should remain readable and
            comfortable. This means proper line height, margins between sections,
            and visual separation between headings and paragraphs.
        </p>

        <h2>Final Thoughts</h2>
        <p>
            Testing with long content early helps prevent serious UI and UX problems
            later. It ensures that the application feels stable and professional,
            even when handling extreme or unexpected input.
        </p>
        `,
        userId: user.id,
        comments: {
        create: [
            {
            content: "This article really highlights important UI edge cases.",
            userId: user.id,
            },
            {
            content: "Long content support is often overlooked — good point!",
            userId: user.id,
            },
        ],
        },
    },
    });


  console.log("✅ Seed finished");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });