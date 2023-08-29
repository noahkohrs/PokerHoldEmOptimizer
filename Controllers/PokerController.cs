using System.Runtime.CompilerServices;
using System.ComponentModel;
using System.Data;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace WinamaxOptimizer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokerController : ControllerBase
    {
        public static List<Card> allCards = getAllCards();
        [HttpPost("evaluate")]
        public IActionResult EvaluateHand([FromBody] CardRequest request)
        {
            if(request.Card1 == null || request.Card2 == null)
            {
                return BadRequest("Both cards are required!");
            }

            CardResponse result = Evaluate(request.Card1, request.Card2);
            return Ok(result);
        }

        public static CardResponse Evaluate(Card card1, Card card2)
        {
            //Iterate very possible combinaison of 5 cards
            // Add every 3 cards combination to ourCards
            List<int> handScore = evalEveryHand(card1, card2);
            CardResponse response = new CardResponse();
            response.Score = handScore.Average();
            response.Pair = handScore.Count(x => x == 1);
            response.DoublePair = handScore.Count(x => x == 2);
            response.Brelan = handScore.Count(x => x == 3);
            response.Straight = handScore.Count(x => x == 4);
            response.Flush = handScore.Count(x => x == 5);
            response.Full = handScore.Count(x => x == 6);
            response.Carre = handScore.Count(x => x == 7);
            response.QuinteFlush = handScore.Count(x => x == 8);
            response.QuinteFlushRoyale = handScore.Count(x => x == 9);
            response.numberOfHands = handScore.Count();
            return response;
        }

        public static List<int> evalEveryHand(Card card1, Card card2)
        {
            List<Card> cardsLeft = getAllCards();
            for (int i = 0; i < cardsLeft.Count; i++)
            {
                if (cardsLeft[i].Suit == card1.Suit && cardsLeft[i].Value == card1.Value)
                {
                    cardsLeft.RemoveAt(i);
                    break;
                }
            }
            for (int i = 0; i < cardsLeft.Count; i++)
            {
                if (cardsLeft[i].Suit == card2.Suit && cardsLeft[i].Value == card2.Value)
                {
                    cardsLeft.RemoveAt(i);
                    break;
                }
            }
            Card[] cards = cardsLeft.ToArray();
            Card[] hand = new Card[7];
            hand[0] = card1;
            hand[1] = card2;

            int currentHand = 0;
            List<int> handScore = new List<int>();
            for (int i = 0; i < cards.Length; i++)
            {
                for (int j = i + 1; j < cards.Length; j++)
                {
                    for (int k = j + 1; k < cards.Length; k++)
                    {
                        for (int l = k + 1; l < cards.Length; l++)
                        {
                            for (int m = l + 1; m < cards.Length; m++)
                            {
                                hand[2] = cards[i];
                                hand[3] = cards[j];
                                hand[4] = cards[k];
                                hand[5] = cards[l];
                                hand[6] = cards[m];
                                handScore.Add(evalHand(hand));
                                currentHand++;
                            }
                        }
                    }
                }
            }
            return handScore;
        }

        public static int evalHand(Card[] hand) {
            if (isQuinteFlushRoyale(hand))
            {
                return 9;
            } else if (isQuinteFlush(hand))
            {
                return 8;
            } else if (isCarre(hand))
            {
                return 7;
            } else if (isFull(hand))
            {
                return 6;
            } else if (isFlush(hand))
            {
                return 5;
            } else if (isStraight(hand))
            {
                return 4;
            } else if (isBrelan(hand))
            {
                return 3;
            } else if (isDoublePair(hand))
            {
                return 2;
            } else if (isPair(hand))
            {
                return 1;
            }
            return 0;
        }


        public static bool isPair(Card[] hand)
        {
            for (int i = 0; i < hand.Length; i++)
            {
                for (int j = i + 1; j < hand.Length; j++)
                {
                    if (hand[i].Value == hand[j].Value)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public static bool isDoublePair(Card[] hand)
        {
            Value? lastPairValue = null;
            for (int i = 0 ; i < hand.Length ; i++)
            {
                for (int j = i + 1 ; j < hand.Length ; j++)
                {
                    if (hand[i].Value == hand[j].Value)
                    {
                        lastPairValue = hand[i].Value;
                        break;
                    }
                }
                if (lastPairValue != null)
                {
                    break;
                }
            }
            if (lastPairValue == null)
            {
                return false;
            }

            for (int i = 0 ; i < hand.Length ; i++)
            {
                for (int j = i + 1 ; j < hand.Length ; j++)
                {
                    if (hand[i].Value == hand[j].Value && hand[i].Value != lastPairValue)
                    {
                        return true;
                    }
                }
            }
            return false;

        }

        public static bool isBrelan(Card[] hand)
        {
            for (int i = 0 ; i < hand.Length ; i++)
            {
                for (int j = i + 1 ; j < hand.Length ; j++)
                {
                    for (int k = j + 1 ; k < hand.Length ; k++)
                    {
                        if (hand[i].Value == hand[j].Value && hand[i].Value == hand[k].Value)
                        {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        public static bool isStraight(Card[] hand)
        {
            int[] values = new int[7];
            for (int i = 0; i < hand.Length; i++)
            {
                values[i] = (int)hand[i].Value;
            }
            Array.Sort(values);
            int straightCounter = 0;
            for (int i = 0; i < values.Length - 1; i++)
            {
                if (values[i] + 1 == values[i + 1])
                {
                    straightCounter++;
                } else if (values[i] == values[i + 1])
                {
                    continue;
                } else
                {
                    straightCounter = 0;
                }
            }
            return straightCounter >= 4;
        }

        public static bool isFlush(Card[] hand)
        {
            int[] suits = new int[4]; 
            for (int i = 0; i < hand.Length; i++)
            {
                switch (hand[i].Suit)
                {
                    case Suit.CLUBS:
                        suits[0]++;
                        break;
                    case Suit.DIAMONDS:
                        suits[1]++;
                        break;
                    case Suit.HEARTS:
                        suits[2]++;
                        break;
                    case Suit.SPADES:
                        suits[3]++;
                        break;
                }
            }
            return suits[0] >= 5 || suits[1] >= 5 || suits[2] >= 5 || suits[3] >= 5;
        }

        public static bool isFull(Card[] hand)
        {
            bool isBrelan = false;
            bool isPair = false;
            Value? brelanValue = null;
            Value? pairValue = null;
            for (int i = 0 ; i < hand.Length ; i++)
            {
                for (int j = i + 1 ; j < hand.Length ; j++)
                {
                    for (int k = j + 1 ; k < hand.Length ; k++)
                    {
                        if (hand[i].Value == hand[j].Value && hand[i].Value == hand[k].Value)
                        {
                            isBrelan = true;
                            brelanValue = hand[i].Value;
                        }
                    }
                }
            }
            if (!isBrelan)
            {
                return false;
            }
            for (int i = 0 ; i < hand.Length ; i++)
            {
                for (int j = i + 1 ; j < hand.Length ; j++)
                {
                    if (hand[i].Value == hand[j].Value && hand[i].Value != brelanValue)
                    {
                        isPair = true;
                        pairValue = hand[i].Value;
                    }
                }
            }
            if (!isPair)
            {
                return false;
            }
            return true;
        }

        public static bool isCarre(Card[] hand)
        {
            for (int i = 0 ; i < hand.Length ; i++)
            {
                for (int j = i + 1 ; j < hand.Length ; j++)
                {
                    for (int k = j + 1 ; k < hand.Length ; k++)
                    {
                        for (int l = k + 1 ; l < hand.Length ; l++)
                        {
                            if (hand[i].Value == hand[j].Value && hand[i].Value == hand[k].Value && hand[i].Value == hand[l].Value)
                            {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }

        public static bool isQuinteFlush(Card[] hand)
        {
            return isFlush(hand) && isStraight(hand);
        }

        public static bool isQuinteFlushRoyale(Card[] hand)
        {
            return (checkCard(Value.TEN, Suit.CLUBS, hand) && checkCard(Value.JACK, Suit.CLUBS, hand) && checkCard(Value.QUEEN, Suit.CLUBS, hand) && checkCard(Value.KING, Suit.CLUBS, hand) && checkCard(Value.ACE, Suit.CLUBS, hand)) ||
                (checkCard(Value.TEN, Suit.DIAMONDS, hand) && checkCard(Value.JACK, Suit.DIAMONDS, hand) && checkCard(Value.QUEEN, Suit.DIAMONDS, hand) && checkCard(Value.KING, Suit.DIAMONDS, hand) && checkCard(Value.ACE, Suit.DIAMONDS, hand)) ||
                (checkCard(Value.TEN, Suit.HEARTS, hand) && checkCard(Value.JACK, Suit.HEARTS, hand) && checkCard(Value.QUEEN, Suit.HEARTS, hand) && checkCard(Value.KING, Suit.HEARTS, hand) && checkCard(Value.ACE, Suit.HEARTS, hand)) ||
                (checkCard(Value.TEN, Suit.SPADES, hand) && checkCard(Value.JACK, Suit.SPADES, hand) && checkCard(Value.QUEEN, Suit.SPADES, hand) && checkCard(Value.KING, Suit.SPADES, hand) && checkCard(Value.ACE, Suit.SPADES, hand));

        }
        public static bool checkValue(Value value, Card[] hand)
        {
            for (int i = 0; i < hand.Length; i++)
            {
                if (hand[i].Value == value)
                {
                    return true;
                }
            }
            return false;
        }
        public static bool checkCard(Value v, Suit s, Card[] hand)
        {
            for (int i = 0; i < hand.Length; i++)
            {
                if (hand[i].Value == v && hand[i].Suit == s)
                {
                    return true;
                }
            }
            return false;
        }

        


    public static List<Card> getAllCards() {
        List<Card> allCards = new List<Card>();
        //Iterate through all suits
        foreach (Suit suit in Enum.GetValues(typeof(Suit)))
        {
            //Iterate through all values
            foreach (Value value in Enum.GetValues(typeof(Value)))
            {
                //Add card to list
                allCards.Add(new Card(suit, value));
            }
        }
        return allCards;
    }
    }

    public class CardRequest
    {
        public Card? Card1 { get; set; }
        public Card? Card2 { get; set; }
    }

    public class CardResponse
    {
        public double Score { get; set; }

        public int Pair { get; set; }
        public int DoublePair { get; set; }
        public int Brelan { get; set; }
        public int Straight { get; set; }
        public int Flush { get; set; }
        public int Full { get; set; }
        public int Carre { get; set; }
        public int QuinteFlush { get; set; }
        public int QuinteFlushRoyale { get; set; }
        public int numberOfHands { get; set;}
    }

    public class Card
    {
        public Suit Suit { get; set; }
        public Value Value { get; set; }

        public Card()
        {
        }

        public Card(Suit suit, Value value)
        {
            Suit = suit;
            Value = value;
        }

        public override string ToString()
        {
            return Value.ToString() + " of " + Suit.ToString();
        }
    }

    public enum Suit
    {
        CLUBS,
        DIAMONDS,
        HEARTS,
        SPADES
    }

    public enum Value
    {
        TWO = 2,
        THREE = 3,
        FOUR = 4,
        FIVE = 5,
        SIX = 6,
        SEVEN = 7,
        EIGHT = 8,
        NINE = 9,
        TEN = 10,
        JACK = 11,
        QUEEN = 12,
        KING = 13,
        ACE = 14
    }
}
 