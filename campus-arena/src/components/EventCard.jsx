import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SportTag from "./SportTag";
import ShareButton from "./ShareButton";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl shadow-lg hover:scale-[1.02] transition overflow-hidden flex flex-col min-h-[420px]">
      {/* Poster Image - landscape-friendly aspect ratio */}
      {event.posterUrl ? (
        <div className="w-full aspect-video flex-shrink-0 overflow-hidden bg-gray-800/30">
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-contain"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      ) : (
        <div className="w-full aspect-video flex-shrink-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20" />
      )}

      {/* Content - grows to fill available space */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title + Share */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-green-400 truncate flex-1" title={event.title}>
            {event.title}
          </h3>
          <ShareButton title={event.title} url={`${window.location.origin}/event/${event.id}`} />
        </div>

        {/* Sport Tag */}
        <div className="mb-3 flex-shrink-0">
          <SportTag sport={event.sport} />
        </div>

        {/* Description - truncated to max 2 lines */}
        <p className="text-gray-300 line-clamp-2 mb-4 flex-shrink-0">
          {event.description || "No description available."}
        </p>

        {/* Metadata - flex-1 so it pushes button to bottom */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Calendar size={16} className="flex-shrink-0" />
            <span className="truncate">{event.date}{event.time ? ` at ${event.time}` : ""}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <MapPin size={16} className="flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 mb-4">
            <Users size={16} className="flex-shrink-0" />
            <span className="truncate">{event.maxParticipants || "Unlimited"} participants</span>
          </div>
        </div>

        {/* View Details - always at bottom */}
        <button
          onClick={() => navigate(`/event/${event.id}`)}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 flex-shrink-0 mt-auto"
        >
          View Details <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}