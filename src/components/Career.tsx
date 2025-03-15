import { FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';
import Timeline from './shared/Timeline';
import ScrollRevealSection from './shared/ScrollRevealSection';
import SplitText from './shared/SplitText';
import GlassCard from './shared/GlassCard';
import { useCVData } from './CVDataProvider';
import { mapWorkExperienceToTimelineItemProps, mapEducationToTimelineItemProps, mapAchievementsToTimelineItemProps } from '../mappers';

const Career = () => {
  // Get CV data from Redux via context
  const { carrierJourney } = useCVData();

  return (
    <section id="career" className="py-20 bg-light-primary dark:bg-dark-primary">
      <div className="container mx-auto px-4">
        <ScrollRevealSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-light-accent dark:text-dark-accent">Career</span> Journey
            </h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
              A timeline of my professional experience, education, and achievements.
            </p>
          </div>
        </ScrollRevealSection>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Work Experience */}
          <ScrollRevealSection direction="left">
            <GlassCard className="h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <FaBriefcase className="mr-2 text-light-accent dark:text-dark-accent" />
                  <SplitText>Work Experience</SplitText>
                </h3>
              </div>
              <Timeline items={mapWorkExperienceToTimelineItemProps(carrierJourney!.workExperiences)} />
            </GlassCard>
          </ScrollRevealSection>

          {/* Education & Achievements */}
          <ScrollRevealSection direction="right">
            <div className="space-y-8">
              <GlassCard>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold flex items-center">
                    <FaGraduationCap className="mr-2 text-light-accent dark:text-dark-accent" />
                    <SplitText>Education</SplitText>
                  </h3>
                </div>
                <Timeline items={mapEducationToTimelineItemProps(carrierJourney!.education)} />
              </GlassCard>

              <GlassCard>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold flex items-center">
                    <FaAward className="mr-2 text-light-accent dark:text-dark-accent" />
                    <SplitText>Achievements</SplitText>
                  </h3>
                </div>
                <Timeline items={mapAchievementsToTimelineItemProps(carrierJourney!.certifications)} />
              </GlassCard>
            </div>
          </ScrollRevealSection>
        </div>
      </div>
    </section>
  );
};

export default Career; 