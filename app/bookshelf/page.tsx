"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CompanionOrb } from "@/components/companion/CompanionOrb";
import { useCompanion } from "@/components/providers/CompanionProvider";
import { Book } from "@/types";

type ReadingState = {
  book: Book;
  currentPage: number;
};

// Simulated book page contents
const BOOK_PAGES: Record<string, { text: string; companionComment: string }[]> = {
  missing_acorns: [
    {
      text: "Once upon a time in the heart of Oak Forest, Moss the Squirrel woke up from a long nap. He rubbed his eyes and checked his tree hollow. Oh no! His favorite winter acorns were gone!",
      companionComment: "“Oh dear, losing acorns is very sad. Moss must be hungry. Let's help him look under the trees!”",
    },
    {
      text: "Pip the Cabbit saw Moss crying. 'Don't worry, Moss! Let's search the forest floor together. Look under those red maple leaves!' Pip pointed his paw toward the roots.",
      companionComment: "“Look! I'm pointing at the red leaves! Tapping them might reveal a clue. What do you see?”",
    },
    {
      text: "Under the golden leaves, they found a trail of shiny brown caps. A friendly blue jay chirped from above, 'Follow the trail to the hollow oak tree! The forest wind blew them there.'",
      companionComment: "“Hooray! The jay is helping us. We're following the trail together!”",
    },
    {
      text: "At the base of the hollow oak, they found a tidy pile of acorns! Moss squealed with joy and hugged Pip. They sat together under the warm sun, sharing a delicious snack.",
      companionComment: "“We did it! You read the clues and helped Moss. That was such a cozy adventure!”",
    },
  ],
  curious_numbers: [
    {
      text: "Welcome to Rabbit Valley, where numbers grow on vines! Pip walks into the carrot patch. 'Let's count the orange carrots,' he says. One, two, three...",
      companionComment: "“Counting is fun! I see the carrots glowing on the vines. Let's count them together.”",
    },
    {
      text: "Suddenly, a giant carrot appears! It takes three normal carrots to balance the scale. Pip places two carrots on the left. How many more do we need on the right?",
      companionComment: "“Simple math is like balancing a playground swing. Let's think: 2 plus what equals 3?”",
    },
    {
      text: "You add one carrot, and the scale balances perfectly! The number vine glows bright blue, unlocking a secret pathway through the valley gates.",
      companionComment: "“Wow, you balanced it! Simple math is like magic once you see the patterns.”",
    },
  ],
  bunny_bridge: [
    {
      text: "A rushing river blocks the path to the clover fields. The bridge has fallen! Pip inspects the wooden logs scattered along the riverbank.",
      companionComment: "“Oh no, the water is moving very fast. We need to be careful and construct a strong bridge!”",
    },
    {
      text: "To build the bridge, we must place the logs first, then tie them with strong vines, and finally place heavy rocks on the ends to secure them.",
      companionComment: "“Sequencing is key. First the logs, second the vines, third the rocks. Let's follow the steps!”",
    },
    {
      text: "You place the logs, tie the ropes, and secure the anchor stones. Click! The bridge is steady. The local bunnies cheer and hop across safely.",
      companionComment: "“Hooray! They are crossing! Our logical planning helped build a safe bridge!”",
    },
  ],
  treasure_map: [
    {
      text: "Captain Rabbiton buried a golden pocket watch somewhere on Sandy Shore. Pip rolls out an ancient parchment map. 'The path starts at the tall palm tree,' he reads.",
      companionComment: "“Look at the coordinates! The map has letters and numbers. Let's locate the tall tree first.”",
    },
    {
      text: "The clues say: 'Take three paces North, then two paces East.' Pip counts the paces in the sand. He stands directly under a wooden treasure chest marker.",
      companionComment: "“We are pacing it out! I can feel the warm ocean breeze. We are getting very close.”",
    },
    {
      text: "Under a pile of seashells, you dig and find the golden watch! It ticks softly. Pip smiles, happy to return the historical artifact to the valley museum.",
      companionComment: "“A real discovery! Navigating with coordinates is a great superpower. You did awesome!”",
    },
  ],
};

export default function BookshelfPage() {
  const { companion, isLoading, books, toggleFavoriteBook, updateBookProgress } = useCompanion();
  const router = useRouter();

  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeReading, setActiveReading] = useState<ReadingState | null>(null);

  // Redirect if companion is not created
  useEffect(() => {
    if (!isLoading && !companion) {
      router.replace("/companion/new");
    }
  }, [isLoading, companion, router]);

  if (isLoading || !companion) {
    return (
      <main className="min-h-screen px-6 py-8 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <CompanionOrb mood="idle" />
          <p className="text-sm text-black/40">Loading library...</p>
        </div>
      </main>
    );
  }

  // Handle Reading progress increment
  const handleNextPage = async () => {
    if (!activeReading) return;

    const bookPages = BOOK_PAGES[activeReading.book.id] || [];
    const nextPage = activeReading.currentPage + 1;

    if (nextPage < bookPages.length) {
      setActiveReading({ ...activeReading, currentPage: nextPage });
      
      // Calculate incremental progress
      const progressPercent = Math.round((nextPage / bookPages.length) * 100);
      await updateBookProgress(activeReading.book.id, progressPercent);
    } else {
      // Mark book as 100% completed
      await updateBookProgress(activeReading.book.id, 100);
      
      // Return to bookshelf view and close reader
      setSelectedBook(null);
      setActiveReading(null);
      setIsZoomed(true);
    }
  };

  const handlePrevPage = () => {
    if (!activeReading || activeReading.currentPage === 0) return;
    setActiveReading({ ...activeReading, currentPage: activeReading.currentPage - 1 });
  };

  // Group books by shelf categories
  const shelf1 = books.filter((b) => b.category === "stories" || b.category === "math");
  const shelf2 = books.filter((b) => b.category === "logic" || b.category === "science");
  const shelf3 = books.filter((b) => b.category === "creativity" || b.category === "language");

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-md">
        
        {/* 1. READER VIEW */}
        {activeReading ? (
          <section className="rounded-[2rem] border border-black/10 bg-[#FAF9F5] p-6 shadow-sm min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-black/45 font-medium mb-6">
                <span>Reading together</span>
                <span>
                  Page {activeReading.currentPage + 1} of{" "}
                  {(BOOK_PAGES[activeReading.book.id] || []).length}
                </span>
              </div>

              {/* Cover mini thumbnail */}
              <div className="flex items-center gap-3 mb-6 bg-white/50 p-3 rounded-2xl border border-black/5">
                <div className={`h-12 w-9 rounded bg-gradient-to-br ${activeReading.book.coverGradient} flex items-center justify-center text-md shadow-xxs`}>
                  {activeReading.book.coverEmoji}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{activeReading.book.title}</h3>
                  <p className="text-xxs uppercase tracking-wider text-black/40">{activeReading.book.category}</p>
                </div>
              </div>

              {/* Book Page Text Card */}
              <div className="rounded-3xl bg-white border border-black/10 p-6 min-h-[12rem] shadow-3xs flex flex-col justify-center">
                <p className="text-base leading-7 font-serif text-black/85">
                  {(BOOK_PAGES[activeReading.book.id] || [])[activeReading.currentPage]?.text || "End of text."}
                </p>
              </div>
            </div>

            {/* Cabbit active participation box */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4 bg-[var(--surface-soft)] p-4 rounded-3xl border border-black/5">
                <div className="shrink-0 scale-75 -mt-3">
                  <CompanionOrb mood="idle" curiosity={companion.curiosity} />
                </div>
                <div className="flex-1">
                  <p className="text-xxs font-bold uppercase tracking-wider text-black/40">
                    {companion.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-black/80 font-medium italic">
                    {(BOOK_PAGES[activeReading.book.id] || [])[activeReading.currentPage]?.companionComment || "“I'm excited to read!”"}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {activeReading.currentPage > 0 && (
                  <button
                    onClick={handlePrevPage}
                    className="flex-1 rounded-full border border-black/10 bg-white px-4 py-3 font-medium text-black/70 cursor-pointer hover:bg-black/5 transition-all text-sm"
                  >
                    Previous Page
                  </button>
                )}
                <button
                  onClick={handleNextPage}
                  className="flex-[2] rounded-full bg-[var(--accent-dark)] px-5 py-4 font-medium text-white shadow-sm hover:brightness-110 cursor-pointer transition-all text-sm text-center"
                >
                  {activeReading.currentPage === (BOOK_PAGES[activeReading.book.id] || []).length - 1
                    ? "Finish Adventure"
                    : "Next Page →"}
                </button>
              </div>
            </div>
          </section>
        ) : (
          
          /* 2. LIBRARY VIEW & WOODEN BOOKSHELF */
          <section className="relative rounded-[2rem] border border-black/10 bg-[#FCFAF5] p-6 shadow-sm min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Link href="/" className="text-sm text-black/50 hover:text-black/80 transition-colors">
                  ← Home
                </Link>
                <span className="text-xxs font-bold uppercase tracking-wider text-black/35">
                  Living Library
                </span>
              </div>

              <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold tracking-tight">The Bookshelf</h1>
                <p className="text-xs text-black/50 mt-1">
                  Choose an adventure to read with {companion.name}.
                </p>
              </div>

              {/* Ambient Cabbit sits beside shelf */}
              {!isZoomed && (
                <div className="mb-6 flex flex-col items-center justify-center bg-white/45 p-4 rounded-3xl border border-black/5 animate-orb-float">
                  <CompanionOrb mood="idle" curiosity={companion.curiosity} />
                  <p className="text-xxs font-bold uppercase tracking-wider text-black/40 mt-3">
                    {companion.name} is waiting
                  </p>
                  <p className="text-xs text-black/65 text-center mt-1">
                    “Tap the shelf to search for our next book!”
                  </p>
                </div>
              )}

              {/* Wooden Bookshelf Container */}
              <div
                onClick={() => {
                  if (!isZoomed) setIsZoomed(true);
                }}
                className={`relative bg-[#8B5A2B] rounded-3xl p-5 border-4 border-[#5C3A1A] shadow-md transition-all duration-700 cursor-pointer ${
                  isZoomed ? "scale-100" : "scale-95 shadow-sm hover:scale-97"
                }`}
              >
                {/* Physical wooden shelves layout */}
                <div className="space-y-8">
                  {/* Shelf 1 */}
                  <div className="relative pb-2 border-b-8 border-[#5C3A1A]">
                    <div className="flex justify-around gap-2 mb-0.5">
                      {shelf1.map((book) => (
                        <div
                          key={book.id}
                          onClick={(e) => {
                            if (isZoomed) {
                              e.stopPropagation();
                              setSelectedBook(book);
                            }
                          }}
                          className={`h-20 w-12 rounded bg-gradient-to-br ${
                            book.coverGradient
                          } flex flex-col justify-between p-1.5 shadow-xxs transition-transform duration-350 hover:-translate-y-2 cursor-pointer relative ${
                            book.isLocked ? "opacity-60" : ""
                          }`}
                        >
                          <span className="text-xxs text-white/50 text-[8px] font-bold uppercase truncate leading-none">
                            {book.category}
                          </span>
                          <span className="text-lg text-center leading-none">{book.coverEmoji}</span>
                          <div className="flex justify-between items-center text-[7px] text-white/70">
                            <span>{book.progress}%</span>
                            {book.isFavorite && <span className="text-amber-300 font-bold">★</span>}
                          </div>
                          {book.isLocked && (
                            <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center text-xs">
                              🗝️
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shelf 2 */}
                  <div className="relative pb-2 border-b-8 border-[#5C3A1A]">
                    <div className="flex justify-around gap-2 mb-0.5">
                      {shelf2.map((book) => (
                        <div
                          key={book.id}
                          onClick={(e) => {
                            if (isZoomed) {
                              e.stopPropagation();
                              setSelectedBook(book);
                            }
                          }}
                          className={`h-20 w-12 rounded bg-gradient-to-br ${
                            book.coverGradient
                          } flex flex-col justify-between p-1.5 shadow-xxs transition-transform duration-350 hover:-translate-y-2 cursor-pointer relative ${
                            book.isLocked ? "opacity-60" : ""
                          }`}
                        >
                          <span className="text-xxs text-white/50 text-[8px] font-bold uppercase truncate leading-none">
                            {book.category}
                          </span>
                          <span className="text-lg text-center leading-none">{book.coverEmoji}</span>
                          <div className="flex justify-between items-center text-[7px] text-white/70">
                            <span>{book.progress}%</span>
                            {book.isFavorite && <span className="text-amber-300 font-bold">★</span>}
                          </div>
                          {book.isLocked && (
                            <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center text-xs">
                              🗝️
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shelf 3 */}
                  <div className="relative pb-2 border-b-8 border-[#5C3A1A]">
                    <div className="flex justify-around gap-2 mb-0.5">
                      {shelf3.map((book) => (
                        <div
                          key={book.id}
                          onClick={(e) => {
                            if (isZoomed) {
                              e.stopPropagation();
                              setSelectedBook(book);
                            }
                          }}
                          className={`h-20 w-12 rounded bg-gradient-to-br ${
                            book.coverGradient
                          } flex flex-col justify-between p-1.5 shadow-xxs transition-transform duration-350 hover:-translate-y-2 cursor-pointer relative ${
                            book.isLocked ? "opacity-60" : ""
                          }`}
                        >
                          <span className="text-xxs text-white/50 text-[8px] font-bold uppercase truncate leading-none">
                            {book.category}
                          </span>
                          <span className="text-lg text-center leading-none">{book.coverEmoji}</span>
                          <div className="flex justify-between items-center text-[7px] text-white/70">
                            <span>{book.progress}%</span>
                            {book.isFavorite && <span className="text-amber-300 font-bold">★</span>}
                          </div>
                          {book.isLocked && (
                            <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center text-xs">
                              🗝️
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back button/instructions for Zoom */}
            <div className="mt-8 text-center">
              {isZoomed ? (
                <button
                  onClick={() => setIsZoomed(false)}
                  className="rounded-full border border-black/10 bg-white px-5 py-3.5 text-center font-medium text-black/65 cursor-pointer hover:bg-black/5 transition-all text-sm"
                >
                  Zoom Out
                </button>
              ) : (
                <span className="text-xs text-black/40 font-medium">
                  Tap the bookshelf to zoom in and browse
                </span>
              )}
            </div>
          </section>
        )}

        {/* 3. BOOK DETAIL MODAL */}
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-[2rem] border border-black/10 bg-white p-6 shadow-md space-y-5 animate-scale-up">
              <div className="flex items-start justify-between gap-4">
                <div className={`h-28 w-20 shrink-0 rounded-xl bg-gradient-to-br ${selectedBook.coverGradient} flex flex-col justify-between p-2 shadow-xs`}>
                  <span className="text-[7px] text-white/50 font-bold uppercase tracking-wider truncate">
                    {selectedBook.category}
                  </span>
                  <span className="text-3xl text-center">{selectedBook.coverEmoji}</span>
                  <div className="flex justify-between items-center text-[8px] text-white/70">
                    <span>{selectedBook.progress}%</span>
                    {selectedBook.isFavorite && <span className="text-amber-300">★</span>}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-1">
                    <h2 className="text-lg font-semibold leading-tight text-black/90">
                      {selectedBook.title}
                    </h2>
                    <button
                      onClick={() => toggleFavoriteBook(selectedBook.id)}
                      className="text-lg text-black/40 hover:text-amber-400 active:scale-90 transition-all cursor-pointer select-none"
                    >
                      {selectedBook.isFavorite ? "★" : "☆"}
                    </button>
                  </div>
                  <p className="text-xxs uppercase tracking-wider text-[var(--accent-dark)] font-bold">
                    {selectedBook.category}
                  </p>
                  <p className="text-xxs text-black/40 font-medium">
                    Age {selectedBook.ageRange} • Est: {selectedBook.readingTime}
                  </p>
                </div>
              </div>

              <p className="text-xs leading-5 text-black/65">
                {selectedBook.description}
              </p>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">
                  Skills Practiced
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBook.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-[#f1efe9] px-2.5 py-0.5 text-xs text-black/65 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xxs font-bold uppercase tracking-wider text-black/40">
                  <span>Adventure Progress</span>
                  <span>{selectedBook.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${selectedBook.progress}%` }}
                    className="h-full bg-[var(--accent)]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="rounded-full border border-black/10 bg-white py-3.5 text-center font-medium text-black/65 cursor-pointer hover:bg-black/5 transition-all text-xs"
                >
                  Close
                </button>
                {selectedBook.isLocked ? (
                  <div className="rounded-full bg-black/15 py-3.5 text-center font-medium text-black/45 text-xs flex items-center justify-center gap-1 select-none">
                    🗝️ Locked
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setActiveReading({ book: selectedBook, currentPage: 0 });
                    }}
                    className="rounded-full bg-[var(--accent-dark)] py-3.5 text-center font-medium text-white shadow-sm hover:brightness-110 cursor-pointer transition-all text-xs"
                  >
                    Read together
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
