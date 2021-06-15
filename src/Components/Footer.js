import React from 'react';

export default function Footer() {
  return (
    <div className="footer">
      <ul>
        <li>&copy; {new Date().getFullYear()} Syed Afroz Pasha 👨‍🚀 🚀-</li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:underline"
            href="https://github.com/SyedAfrozPasha"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:underline"
            href="https://www.linkedin.com/in/syedafrozpasha"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}
