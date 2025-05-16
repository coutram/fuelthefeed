# Fuel The Feed - Frontend

A Next.js-based web application for managing influencer marketing campaigns. This platform connects brands with content creators, facilitating campaign creation, management, and creator recruitment.

## Features

- Campaign Management
  - Create and manage marketing campaigns
  - Set campaign budgets and timelines
  - Generate campaign briefs
  - Track campaign status (recruiting, active, ended)

- Creator Management
  - View and manage creator applications
  - Approve/reject creator applications
  - Track creator performance

- Wallet Integration
  - Aptos blockchain wallet integration
  - Secure authentication

## Tech Stack

- Next.js 15.3.1
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Aptos Wallet Adapter

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── types/           # TypeScript type definitions
└── api/             # API integration functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request