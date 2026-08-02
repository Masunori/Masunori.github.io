import { ImageWithCaption, VideoWithCaption } from './BlogComponents'
import styles from './blogContent.module.css'

export default function Content() {
    return (
        <article className={styles.blogContent}>
            <section>
                <p style={{ textAlign: "center" }}>
                    <b>NOTE</b>: The experience is also "documented" in <span><a href="https://www.instagram.com/stories/highlights/17860123089607088/" target="_blank" rel="noopener noreferrer">my Instagram</a></span>!
                </p>

                <ImageWithCaption 
                    src='/blogs/melbourne/thumbnail.jpg'
                    alt='A (completely unrelated) photo of my souvenir from Melbourne, Australia.'
                    caption='A (completely unrelated) photo of my souvenir from Melbourne, Australia'
                />

                <p>
                    While studying at the National University of Singapore (NUS), I had the opportunity to engage in a 
                    semester-long exchange at the University of Melbourne. I have long expected that it would be a fun 
                    and life-changing experience, and yet it still manages to completely obliterate my expectations.
                </p>
            </section>

            <section>
                <h2>
                    I - Applying for Exchange
                </h2>
                <p>
                    In NUS, registration for exchange started at least one academic year prior to the actual exchange. While 
                    other faculties and departments had a more holistic approach to evaluating candidate students for exchange,
                    the School of Computing (SOC) has a simpler, more academic-focused approach, where only GPA matters.
                </p>
                <p>
                    Then, each student was allowed to select up to 5 options from a list of partner universities. At the point 
                    of application, my biggest criteria was to select a university from a country that I have relatives living in,
                    so that I have a reliable "point of support" throughout the exchange. The next criteria is safety, which makes
                    both Europe and the US less ideal. The final criteria is the quality of education. With that, my first three 
                    choices were in Australia (2 in Melbourne and 1 in Queensland), and the last two choices were in Canada.
                </p>
                <p>
                    Coincidentally, Europe and the US, having the top-tier universities and areas extremely lucrative for students
                    trying to build their network such as The Wall Street and Silicon Valley. It makes competition for those regions
                    much more intense, and consequentially, it is much easier to apply for exchange in areas like East Asia and 
                    Australia. On top of that, I have a sufficiently high GPA, allowing me to receive an offer for my first choice,
                    the University of Melbourne (Unimelb).
                </p>
            </section>

            <section>
                <h2>
                    II - Preparing for Exchange
                </h2>
                <p>
                    Preparation for the exchange semester started one semester before the exchange. It started with me applying 
                    on Unimelb's application portal, with recommendation from NUS. At the same time, I had to
                    research modules I would be taking during the exchange and map them to respective NUS modules.
                </p>
                <p>
                    After receiving the offer from Unimelb, I proceeded to apply for Student Visa (class 500) on Australia's 
                    immigration portal. The application cost back then was AUD 2,000. (WTAF???)
                </p>
                <p>
                    Accommodation was another shocking point. It was unusually expensive, even more expensive than Singapore, and
                    this also applies to on-campus accommodation. Back in my time, it was AUD 400 per week. Off-campus accommodation
                    was not any better: housing offered by locals was hard to find, leaving me with the more abundant private student
                    accommodations, whose price ranged from AUD 350 to AUD 500 per week. I finally settled with Scape Melbourne Central.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/scape-melbourne-central.jpg'
                    alt='My last day at Scape'
                    caption='My last day at Scape'
                />
                <p>
                    Yes, I realised I had not taken any photos with my accommodation, up until my final day in Australia :'(
                </p>
                <p>
                    Finally, I settled with plane tickets, brush up a bit on Australia's culture, and we are ready!
                </p>
            </section>

            <section>
                <h2>
                    III - From Hanoi, Vietnam to Melbourne, Australia
                </h2>
                <p>
                    Direct flights from Hanoi to Melbourne were twice as expensive as transit at Ho Chi Minh City, and the fact 
                    that it was right after the Lunar New Year only made it worse. I settled with a flight in the early morning 
                    from Noi Bai Airport, Hanoi, to Tan Son Nhat Airport, Ho Chi Minh City, followed by a few hours transit and 
                    a final flight from Tan Son Nhat Airport to Melbourne International Airport at Tullamarine.
                </p>
                <p>
                    I hate long-distance flights with a passion.
                </p>
                <ImageWithCaption
                    src='/blogs/melbourne/hn-to-hcm.jpg'
                    alt='From Hanoi to HCMC'
                    caption='From Hanoi to Ho Chi Minh City'
                />
                <ImageWithCaption
                    src='/blogs/melbourne/pho-at-hcm.jpg'
                    alt='VND 200,000 Pho at Tan Son Nhat Airport'
                    caption='VND 200,000 Pho at Tan Son Nhat Airport'
                />
                <p>
                    I didn't even know why I decided to eat this...
                </p>
                <ImageWithCaption
                    src='/blogs/melbourne/hcm-to-melb.jpg'
                    alt='From HCMC to Melbourne'
                    caption='From Ho Chi Minh City to Melbourne'
                />
                <p>
                    But finally, I arrived at Melbourne (hooray)!
                </p>
            </section>

            <section>
                <h2>
                    IV - First Impression
                </h2>
                <p>
                    I have been living in Singapore for so long, that I take Changi Airport, one of the best airports 
                    in the world, for granted. The airport at Melbourne felt underwhelming. But like every time you 
                    visit somewhere new, it feels extremely exciting! My long-awaited semester has finally started.
                </p>
                <p>
                    Queueing for immigration, then baggage, then going round and round, with phone battery at one digit,
                    powerbank completely used up, not a fun experience.
                </p>
                <p>
                    If anything, the chauffeur (IDEK how to spell it) had a spare powerbank. I survived!
                </p>
                <p>
                    Upon arriving at my Scape, I quickly organised my stuff in the suitcase, and set up my laptop. It 
                    was 12 midnight, and yet my roommate was not in the room. Well, it's not like I have any control
                    over it, so I just went to sleep.
                </p>
                <ImageWithCaption
                    src='/blogs/melbourne/first-day-laptop-setup.jpg'
                    alt='My setup'
                    caption='My laptop setup the moment I reached my Scape'
                />
                <p>
                    On the next day, I decided to go around my area to explore. As implied from my accommodation name, 
                    Scape Melbourne Central, it did not take me long to reach Melbourne Central, a mindblowingly large
                    shopping mall in the hearts of Melbourne. 
                </p>
                <ImageWithCaption
                    src='/blogs/melbourne/melb-central.jpg'
                    alt='La Trobe Street'
                    caption='La Trobe Street'
                />
                <ImageWithCaption
                    src='/blogs/melbourne/melb-central-2.jpg'
                    alt='Melbourne Central'
                    caption='Melbourne Central shopping mall, La Trobe Street'
                />
                <p>
                    And guess what? On the top floor, there is an arcade, and in the arcade, there is Taiko no Tatsujin!
                    It's a drum game, that's all you need to know.
                </p>
                <ImageWithCaption
                    src='/blogs/melbourne/taiko.png'
                    alt='Taiko no Tatsujin'
                    caption='Taiko no Tatsujin arcade game, B. Lucky & Sons, Melbourne Central'
                />
                <p>
                    From my Scape to Unimelb, I need to walk along La Trobe Street, then taking a left turn to Swanston 
                    Street and walk straight untl I reach Unimelb. I could have taken a tram, but I prefer walking. It
                    is my (only) source of exercise, and it is also good to know what's in the neighbourhood. 
                </p>
                <ImageWithCaption
                    src='/blogs/melbourne/swanston-st.jpg'
                    alt='Swanston Street'
                    caption='Swanston Street'
                />
                <p>
                    To wrap up my first impression segment, I have to mention Unimelb's international and exchange students'
                    welcome day. The only part I hated about it was that it started more than a week prior to the first day 
                    of the semester, and it was also compulsory, forcing me to leave Vietnam early. However, the event itself 
                    was fun. I am extremely impressed by the amount of effort that Unimelb put in to ensure maximum student
                    welfare. There were a lot of support services available, much more than what I have seen in NUS.
                </p>
                <p>
                    The welcome event ended with all international and exchange students having Aussie pies for lunch. I go
                    with the minced beef pie, and it was delicious! I even managed to take away two beef burgundy pies for 
                    dinner, only to realise that they used red wine in the sauce and I have zero alcohol tolerance :(
                </p>
                <ImageWithCaption
                    src='/blogs/melbourne/aussie-pie.jpg'
                    alt='Aussie Pie'
                    caption='Aussie Pie at the welcome event'
                />
                <p>
                    Oh yeah, I also met other exchange students from NUS in person for the first time.
                </p>
            </section>

            <section>
                <h2>
                    V - The Sydney Trip
                </h2>
                <p>
                    I had more than a week before the start of the semester. My cousins also flew to Australia for a holiday,
                    so we go to Sydney together.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/me-and-cousins.jpg'
                    alt='Me and Cousins in Melbourne'
                    caption='Me and my cousins in Melbourne, Australia'
                />
                <p>
                    When I say "we", only my brother went with me. My sister was busy with her work. Anyway, she had been staying 
                    in Australia for quite a while, she should have been to Sydney at least once.
                </p>
                <p>
                    The flight from Melbourne to Sydney took 1 hour. My first impression was "WHAT THE HELL IS STATION ACCESS FEE???". 
                    I had some money in my Opal card before hand, and it just straight-up wiped out my balance. Once again, I have
                    taken Singapore's public-owned transport system for granted.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/some-station-at-sydney.jpg'
                    alt='A station at Sydney'
                    caption='Domestic Airport Station at Sydney, Australia'
                />
                <p>
                    On the same night, we went to the Sydney Opera House. We booked a hotel in the CBD area, so it was not too far.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/sydney-harbour-bridge.jpg'
                    alt='Sydney Harbour Bridge'
                    caption='Sydney Harbour Bridge, Sydney, Australia'
                />
                <ImageWithCaption 
                    src='/blogs/melbourne/sydney-opera-house.jpg'
                    alt='Sydney Opera House'
                    caption='Sydney Opera House, Sydney, Australia'
                />
                <VideoWithCaption
                    src='/blogs/melbourne/seagulls.mp4'
                    caption='These seagulls in the Sydney Harbour scared me CB >:('
                />
                <p>
                    On the second day, we booked a tour to the Blue Mountains. I don't know how do describe; it was just a mountain range. 
                    But it looked majestic.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/three-sisters-mountain.jpg'
                    alt='Three Sisters Mountain'
                    caption='Three Sisters Mountain, Katoomba, Australia'
                />
                <p>
                    The Blue Mountains was situated in Scenic World of Katoomba, which was about a 2-hour drive from Sydney. We managed to 
                    try out all "forms of transport" in the Scenic World.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/scenic-railway.jpg'
                    alt='Scenic Railway'
                    caption='Scenic Railway, top-down view at the destination'
                />
                <ImageWithCaption 
                    src='/blogs/melbourne/scenic-railway-2.jpg'
                    alt='Scenic Railway'
                    caption='Scenic Railway, bottom-up view at the destination'
                />
                <p>
                    The Scenic Railway features a 52-degree incline, which was the steepest in the world for a passenger railway. You can 
                    definitely feel it as the train suddenly transitions from a horizontal to vertical position.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/ferns-in-scenic-walkway.jpg'
                    alt='Ferns in Scenic Walkway'
                    caption='Ferns in Scenic Walkway'
                />
                <p>
                    The Scenic Walkway was a 2.4km-long walk through the ancient rainforest of the Blue Mountains. What sets it apart from 
                    other forests is that it has an overwhelming number of ferns. Ferns have been around for more than 300 million years, 
                    and they are one of the oldest plants on Earth. Stepping into the Scenic Walkway really felt like going back when
                    the dinosaurs were still roaming the Earth.
                </p>
                <p>
                    Then, we went to the Leura, a locality in the Blue Mountains. The town felt like a small, white village. There, we tried
                    kangaroo meat for the first time. It was probably because the chefs masked the gamey taste of the kangaroo meat with a lot 
                    of spices, but it felt like I was eating beef. That was the only time I touched kangaroo meat...
                </p>
                <p>
                    And, the average food portion in Australia is so huge. I barely finished my meal.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/lunch-at-leura.jpg'
                    alt='Lunch at Leura'
                    caption='Lunch at Leura, Blue Mountains, Australia'
                />
                <ImageWithCaption 
                    src='/blogs/melbourne/ice-cream-at-leura.jpg'
                    alt='Ice Cream at Leura'
                    caption='(The humongous portion of) Ice Cream at Leura, Blue Mountains, Australia'
                />
                <p>
                    On the same night, I took a walk to the Darling Harbour.
                </p>

                <ImageWithCaption 
                    src='/blogs/melbourne/darling-harbour.jpg'
                    alt='Darling Harbour'
                    caption='Darling Harbour (bad panoramic view), Sydney, Australia'
                />
                <p>
                    On the third day, my cousin and I split up. I knew a friend in Sydney who had an exchange semester in NUS before, and he
                    was kind enough to bring me around. But before he arrived, I visited the University of Sydney. It looked like any other
                    university, but the "selling point" was the Quadrangle, which gave off a Hogwarts vibe. In no universe or timeline would
                    I imagine a huge castle in the middle of a university campus. And I believed the tourists taking photos around me shared
                    the sentiment.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/quadrangle-uni-sydney.jpg'
                    alt='Quadrangle at University of Sydney'
                    caption='Quadrangle at University of Sydney, Sydney, Australia'
                />
                <p>
                    Then, I visit the Chau Chak Wing Building nearby, which functioned as a museum and a library. I don't think there was a 
                    central theme though; there was anything from ancient animals and countries' history to modern art and machinery. 
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/chau-chak-wing-museum.jpg'
                    alt='Chau Chak Wing Building'
                    caption='Some huge Lego structure in the Chau Chak Wing Building'
                />
                <p>
                    Finally, my friend arrived. We took the ferry to Manly, a suburb of Sydney. The ferry travelled from the Sydney Harbour
                    to Manly, passing the opening to the ocean. The wind was very loud.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/sydney-ferry.jpg'
                    alt='Sydney Ferry'
                    caption='The ferry passed the opening to the ocean'
                />
                <p>
                    You can really feel the beach-y vibes in Manly.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/manly-beach.jpg'
                    alt='Manly Beach'
                    caption='Manly Beach, Sydney, Australia'
                />
                <p>
                    After walking along the beach, I asked him what kind of Australian food I should try. We ended up having fish and chips
                    for dinner. And as expected, the portion was huge and I could not finish it. He also introduced me to a "weird" spice: 
                    the chicken salt. It really enhanced the taste of the fish and chips.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/fish-and-chips.jpg'
                    alt='Fish and Chips'
                    caption='Fish and Chips'
                />
                <ImageWithCaption 
                    src='/blogs/melbourne/chicken-salt.jpg'
                    alt='Chicken Salt'
                    caption='Chicken Salt'
                />
                <p>
                    After dinner, we tried Yochi, a frozen yoghurt dessert brand. It originated in Australia and recently expanded to Singapore.
                    Welp, I managed to try the original Yochi in Singapore. They have quite a unique pricing concept: you pay for the weight of 
                    the yoghurt, so the rest of the experience was just us trying to "optimise" the proportions of the yoghurt and toppings.
                    I managed to pull a sub-10-dollars Yochi, which was a good deal. Same for my friend.
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/first-yochi.jpg'
                    alt='First Yochi'
                    caption='First Yochi in (both Singapore and) Australia'
                />
                <p>
                    Finally, we returned to the Sydney Harbour. The night view of the Sydney Opera House and the Sydney Harbour Bridge was 
                    very beautiful, except my phone did not have enough resolution to capture the beauty :(
                </p>
                <p>
                    On the final day of the Sydney trip, I went to Hyde Park, as recomended by my friend. It had a huge fountain in the middle,
                    and as you walked into the park, there was also a museum (I don't really know what it was called). There were a lot of war 
                    artefacts inside.  
                </p>
                <ImageWithCaption 
                    src='/blogs/melbourne/hyde-park.jpg'
                    alt='Hyde Park'
                    caption='Hyde Park, Sydney, Australia'
                />
                <VideoWithCaption 
                    src='/blogs/melbourne/flappy-bird.mp4'
                    caption='Some bird flapping its wings in the fountain'
                />
                <p>
                    Yes, I like to take videos and pictures of random things I see. Most of my camera roll during the exchange semester was filled
                    with random animals.
                </p>
                <p>
                    With that, my Sydney trip ended. Overall, a wonderful experience. Would be an 11 out of 10 if I can attend the anime
                    convention that happened on the weekend (I flew back during the weekday...).
                </p>
            </section>

            <section>
                <h2>
                    VI - Puffing Billy, Dandenong Ranges and Yarra Valley
                </h2>
            </section>

            <section>
                <h2>
                    VII - Academics
                </h2>
                <p>
                    I have taken 4 modules (called subjects in Unimelb) during my exchange semester: 
                </p>
                <ul>
                    <li>
                        Physics Advanced (PHYC10001)
                    </li>
                    <li>
                        Algorithms and Complexity (COMP90038)
                    </li>
                    <li>
                        Game Design (INFO30009)
                    </li>
                    <li>
                        Chinese 3 (CHIN20001)
                    </li>
                </ul>
            </section>
        </article>
    )
}