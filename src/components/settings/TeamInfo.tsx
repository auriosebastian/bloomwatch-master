"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Code } from 'lucide-react';

const teamMembers = [
    { name: "Aurio Sebastião", role: "Desenvolvedor Frontend", avatar: "AS", color: "from-blue-400 to-cyan-400" },
    { name: "Americo Andre", role: "Especialista GIS", avatar: "AA", color: "from-emerald-400 to-green-400" },
    { name: "Francisco André", role: "Analista de Dados & Full-stack", avatar: "FA", color: "from-purple-400 to-pink-400" },
    { name: "Jaime Francisco", role: "Desenvolvedor Backend", avatar: "JF", color: "from-orange-400 to-red-400" },
    { name: "Lirio João", role: "Designer", avatar: "LJ", color: "from-yellow-400 to-amber-400" },
    { name: "Rayssa Rodrigues", role: "Oradora", avatar: "RR", color: "from-indigo-400 to-blue-400" }
];

interface AppInfo { version: string; team: string; lastUpdate: string; region: string; status: string; }
interface TeamInfoProps { appInfo: AppInfo; }

export function TeamInfo({ appInfo }: TeamInfoProps) {
    return (
        <Card id="app-info" className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100/50">
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800"><Users className="w-6 h-6 text-amber-600" />Nossa Equipe - Grupo Galactus X</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Conheça a equipe por trás do projeto BloomWatch</p>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2"><Code className="w-5 h-5 text-blue-600" />Sobre o Projeto</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-blue-50/50 rounded-xl"><span className="text-sm font-medium text-gray-700">Versão</span><Badge className="bg-blue-100 text-blue-800 border-0 font-mono">{appInfo.version}</Badge></div>
                            <div className="flex justify-between items-center p-4 bg-green-50/50 rounded-xl"><span className="text-sm font-medium text-gray-700">Equipe</span><span className="text-sm text-gray-600">{appInfo.team}</span></div>
                            <div className="flex justify-between items-center p-4 bg-amber-50/50 rounded-xl"><span className="text-sm font-medium text-gray-700">Última Atualização</span><span className="text-sm text-gray-600">{appInfo.lastUpdate}</span></div>
                            <div className="flex justify-between items-center p-4 bg-emerald-50/50 rounded-xl"><span className="text-sm font-medium text-gray-700">Região Monitorada</span><span className="text-sm text-gray-600">{appInfo.region}</span></div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2"><Users className="w-5 h-5 text-purple-600" />Membros da Equipe</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-3 shadow-md`}>{member.avatar}</div>
                                    <div className="font-semibold text-gray-800 text-sm">{member.name}</div>
                                    <div className="text-xs text-gray-600 mt-1">{member.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}