/**
 * Migration Script: Populate solvedProblems for Existing Users
 * 
 * This script migrates existing user data by populating the solvedProblems array
 * based on their historical ACCEPTED submissions.
 * 
 * Run this BEFORE deploying the new streak logic to ensure all users have
 * their solvedProblems array properly initialized.
 * 
 * Usage: node migrate-solved-problems.js
 */

const { connectDB, User, Submission } = require("@repo/db");
require("dotenv").config();

async function migrateSolvedProblems() {
  try {
    console.log("🔗 Connecting to database...");
    await connectDB();
    console.log("✅ Connected successfully\n");

    console.log("📊 Starting migration...");
    
    // Get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users to migrate\n`);

    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        // Check if already migrated (has solvedProblems array populated)
        if (user.solvedProblems && user.solvedProblems.length > 0) {
          console.log(`⏭️  Skipping user ${user.email} - already has solvedProblems`);
          skippedCount++;
          continue;
        }

        // Get all distinct problemIds from ACCEPTED submissions
        const solvedProblemIds = await Submission.distinct("problemId", {
          userId: user._id,
          status: "ACCEPTED"
        });

        if (solvedProblemIds.length === 0) {
          console.log(`⏭️  Skipping user ${user.email} - no solved problems`);
          skippedCount++;
          continue;
        }

        // Update user with solvedProblems array
        user.solvedProblems = solvedProblemIds;
        await user.save();

        console.log(`✅ Migrated user ${user.email}: ${solvedProblemIds.length} solved problems`);
        migratedCount++;

      } catch (error) {
        console.error(`❌ Error migrating user ${user.email}:`, error.message);
        errorCount++;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📈 Migration Summary:");
    console.log(`   ✅ Migrated: ${migratedCount} users`);
    console.log(`   ⏭️  Skipped: ${skippedCount} users`);
    console.log(`   ❌ Errors: ${errorCount} users`);
    console.log("=".repeat(50));

    if (errorCount === 0) {
      console.log("\n🎉 Migration completed successfully!");
    } else {
      console.log("\n⚠️  Migration completed with errors. Please review the logs above.");
    }

  } catch (error) {
    console.error("\n❌ Fatal error during migration:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run migration
migrateSolvedProblems();
