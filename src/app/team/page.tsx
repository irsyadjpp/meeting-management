
'use client';
import { steeringCommittee, divisions } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Shield,
  Briefcase,
  Megaphone,
  HardHat,
  Server,
  Gavel,
  Plus,
  Bot,
  User,
  Check,
  Phone,
  Mail,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';

const iconMap: { [key: string]: React.ElementType } = {
  'Match Control & Integrity': Shield,
  Commercial: Briefcase,
  'Show & Media': Megaphone,
  Operations: HardHat,
  'IT & Digital': Server,
  Legal: Gavel,
};

type Member = {
  name: string;
  role: string;
  tasks: string[];
  avatar?: { imageUrl: string; imageHint: string };
  isVacant?: boolean;
};

const MemberCard = ({ member }: { member: Member }) => {
  if (member.isVacant) {
    return (
      <div className="flex h-full min-h-[100px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-yellow-400 bg-yellow-400/10 p-4 text-center">
        <p className="font-semibold text-sm text-yellow-400">{member.role}</p>
        <Badge
          variant="secondary"
          className="mt-2 bg-yellow-400 text-black"
        >
          Open Recruitment
        </Badge>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="glassmorphic h-full cursor-pointer rounded-lg p-4 text-center transition-all hover:bg-white/20">
          {member.avatar && (
            <Image
              src={member.avatar.imageUrl}
              alt={`Avatar of ${member.name}`}
              width={64}
              height={64}
              className="mx-auto mb-3 rounded-full border-2 border-accent"
              data-ai-hint={member.avatar.imageHint}
            />
          )}
          <h4 className="font-semibold text-sm">{member.name}</h4>
          <p className="text-xs text-muted-foreground">{member.role}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="glassmorphic sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{member.name}</DialogTitle>
          <DialogDescription>{member.role}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <h3 className="font-semibold text-foreground">Duty Checklist</h3>
          <ul className="space-y-2">
            {member.tasks.map((task, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <span className="text-sm text-muted-foreground">{task}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
           <Button asChild variant="secondary">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-4 w-4" /> WhatsApp
              </a>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function TeamPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Organization & Task Force
        </h1>
        <p className="text-muted-foreground">BCC 2026 Command Center</p>
      </div>

      {/* Steering Committee */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          The Core (Steering Committee)
        </h2>
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steeringCommittee.map((member) => (
            <motion.div key={member.name} variants={itemVariants}>
              <MemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divisions */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Division Squads (The Executors)
        </h2>
        <motion.div 
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {divisions.map((division) => {
            const Icon = iconMap[division.name];
            return (
              <motion.div key={division.name} variants={itemVariants}>
                <Card className="glassmorphic h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {Icon && <Icon className="h-6 w-6 text-accent" />}
                      {division.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                        <h3 className="font-semibold text-sm mb-2 text-muted-foreground">Coordinator</h3>
                        <MemberCard member={division.coordinator} />
                    </div>
                    
                    {division.members && division.members.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-sm mb-2 text-muted-foreground">Members</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {division.members.map((member, index) => (
                                    <MemberCard key={index} member={member} />
                                ))}
                            </div>
                        </div>
                    )}

                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
