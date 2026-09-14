'use client';

import React from 'react';
import { Card } from '../ui/Card';
import Link from 'next/link';

interface TeamCardProps {
  team: {
    id: number;
    team_name: string;
    description: string;
    status: string;
    organizer_contact: string;
    player_steam_ids: string[];
  };
}

export function TeamCard({ team }: TeamCardProps) {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800'
  };

  return (
    <Card hoverable>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-[#111a23]">{team.team_name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[team.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
          {team.status}
        </span>
      </div>
      <p className="text-sm text-[#7b838d] mb-4 line-clamp-2">{team.description}</p>
      <div className="flex justify-between items-center text-xs text-[#7b838d]">
        <span>{team.player_steam_ids.length} участников</span>
        <Link href={`/teams/${team.id}`} className="text-[#c43636] hover:underline">
          Подробнее →
        </Link>
      </div>
    </Card>
  );
}
