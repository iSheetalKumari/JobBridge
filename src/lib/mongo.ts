import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

const MONGO_URI = process.env.MONGO_URI;

export async function connectToDatabase() {
  if (!MONGO_URI) {
    console.warn('connectToDatabase: MONGO_URI is not set');
    return;
  }

  if (global._mongoosePromise) {
    return global._mongoosePromise;
  }

  const opts = {
    // add any mongoose options you want here
    // useUnifiedTopology and useNewUrlParser are defaults in modern mongoose
  } as const;

  global._mongoosePromise = mongoose.connect(MONGO_URI, opts) as Promise<typeof mongoose>;
  try {
    await global._mongoosePromise;
    return global._mongoosePromise;
  } catch (err) {
    // Clear the cached promise so subsequent calls can retry
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete global._mongoosePromise;
    throw err;
  }
}

export default connectToDatabase;
