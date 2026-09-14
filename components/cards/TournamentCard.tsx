'use client';

import React from 'react';
import { Card } from '../ui/Card';
import Link from 'next/link';

interface TournamentCardProps {
  tournament: {
    id: number;
    title: string;
    access_type: string;
    format: string;
    description: string;
    prize: string;
    status: string;
  };
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    LIVE: 'bg-red-100 text-red-800',
    COMPLETED: 'bg-gray-100 text-gray-800'
  };

  return (
    <Card hoverable>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-[#111a23]">{tournament.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[tournament.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
          {tournament.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[#7b838d]">Формат:</span>
          <span className="font-medium">{tournament.format}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#7b838d]">Призовой фонд:</span>
          <span className="font-medium text-[#c43636]">{tournament.prize}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#7b838d]">Доступ:</span>
          <span className="font-medium">{tournament.access_type}</span>
        </div>
      </div>
      <p className="text-sm text-[#7b838d] mb-4 line-clamp-2">{tournament.description}</p>
      <Link href={`/tournaments/${tournament.id}`} className="text-[#c43636] hover:underline text-sm">
        Подробнее →
      </Link>
    </Card>
  );
}
